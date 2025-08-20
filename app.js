const express = require('express');
const morgan = require('morgan');

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

module.exports = app;
