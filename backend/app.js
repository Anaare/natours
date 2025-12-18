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
const bookingRouter = require('./routes/bookingRoutes');
const bookingController = require('./controllers/bookingController');
const reviewRouter = require('./routes/reviewRoutes');
const compression = require('compression');

const app = express();

app.set('trust proxy', 1);

// 1) GLOBAL MIDDLEWARES

// app.use is a METHOD used to MOUNT middleware functions!!!

// Set security HTTP headers
app.use(helmet());

// Cookie parser
app.use(cookieParser());

// Configuring CORS

/* 
If I want to allow EVERYONE to access API, which will work or "simple" 
request -> GET + POST
app.use(cors()) <- THAT'S IT 

by adding options we allow all kinds of requests,
which can be to ALL routes as well as to route we choose.
app.options('*', cors());

*/
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  process.env.FRONTEND_URL,
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow mobile/postman
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  }),
);

app.options('*', cors());

///////////////////////////////////////////////////////////////////////////

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

// MUST BE PLACED BEFORE app.use(express.json())

app.post(
  '/webhooks/stripe',
  express.raw({ type: 'application/json' }),
  bookingController.webhookCheckout,
);

// Body Parser, reading data from body into req.body
app.use(
  express.json({
    limit: '10kb',
  }),
);

// Cookie Parser
// app.use(cookieParser());

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
// app.use(express.static(`${__dirname}/public`));

app.use(compression());

// Test Middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});

// 3) ROUTES

// Process is called mounting a route

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

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
