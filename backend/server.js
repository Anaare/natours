const mongoose = require('mongoose');

const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('Uncaught exception 💥 shutting down...');
  console.log(err.name, err.message);
  process.exit(1); // 1 stands for uncaught exception
});

dotenv.config({ path: './config.env' });

const app = require('./app');

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log('DB connection successfull'));

const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandled rejection 💥 shutting down...');
  console.log(err);
  server.close(() => {
    process.exit(1); // 1 stands for uncaught exception
  });
});
