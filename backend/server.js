const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('Uncaught exception 💥 shutting down...');
  console.log(err.name, err.message);

  process.exit(1);
});

dotenv.config({ path: './config.env' });

// Add these lines at the very top of your server.js
require('@babel/register')({
  // Presets tell Babel how to translate the code
  presets: ['@babel/preset-env', '@babel/preset-react'],

  // IMPORTANT: Tell Babel which directories to process.
  // It should include the path to your new template files.
  ignore: [/node_modules/],

  // You might also need this if your template files use .jsx extension
  extensions: ['.js', '.jsx'],
});

const app = require('./app');

// app.use('/img/users', express.static(path.join(__dirname, 'public/img/users')));

let server;
mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log('DB connection successful');

    const port = process.env.PORT || 8000;

    server = app.listen(port, () => {
      console.log(`App running on port ${port}...`);
    });

    process.on('unhandledRejection', (err) => {
      console.log('Unhandled rejection 💥 shutting down...');
      console.log(err);

      server.close(() => {
        process.exit(1);
      });
    });
  })
  .catch((err) => {
    console.log('FATAL: DB connection failed 💣');
    console.error(err.message);
    process.exit(1);
  });
