const mongoose = require('mongoose');

const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log('DB connection successfull'));

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
