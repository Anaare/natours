const express = require('express');
const morgan = require('morgan');

const appError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MIDDLEWARES

// app.use is a METHOD used to MOUNT middleware functions!!!
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(express.json());

// Serve static files
// To access it http://localhost:3000/overview.html (It doesn't need /public in it anymore)
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});

// 3) ROUTES

// Process is called mounting a route

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

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
