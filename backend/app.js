const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');

const cors = require('cors');

const appError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');

const app = express();

// 1) GLOBAL MIDDLEWARES

// app.use is a METHOD used to MOUNT middleware functions!!!

// Set security HTTP headers
app.use(helmet());

// Configuring CORS
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);

// Development logging in a console
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Rate limiter counts number of requests and BLOCKS then when there's TOO MANY
// 1) Creating limiter
const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000, //Timeframe
  message: 'Too many requests from this IP, please try again in an hour!',
});

// 2) Mounting limiter
app.use('/api', limiter);

// Body Parser, reading data from body into req.body
app.use(
  express.json({
    limit: '10kb',
  }),
);

// Cookie Parser
app.use(cookieParser());

// Data sanitization against NoSQL query injection (Someone is ABLE to login without knowing email)
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsAverage',
      'ratingsQuantity',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  }),
);

// Serve static files
// To access it http://localhost:3000/overview.html (It doesn't need /public in it anymore)
app.use(express.static(`${__dirname}/public`));

// Test Middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.cookies);

  next();
});

// 3) ROUTES

// Process is called mounting a route

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

// Will run for ALL http verbs
// Handling UNHANDLED routes
app.all('/{*any}', (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  // err.status = 'fail';
  // err.statusCode = 404;

  next(new appError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error handling middleware
app.use(globalErrorHandler);

module.exports = app;
