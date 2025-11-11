const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const slugify = require('slugify');

// ✅ Register User model before Tour (prevents MissingSchemaError)
require('../models/userModel');
const Tour = require('../models/tourModel');

// ✅ Load env variables from correct absolute path
dotenv.config({ path: path.join(__dirname, '../config.env') });

// Log to confirm
console.log(
  'Loaded DB string:',
  process.env.DATABASE ? '✅ Found' : '❌ Not found',
);

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

// (optional) Disable all query middleware for this script
// Tour.schema._middleware = null;

async function generateSlugs() {
  try {
    await mongoose.connect(DB);
    console.log('✅ DB connected');

    // ⚙️ Bypass middleware (avoid population)
    const tours = await Tour.find({ slug: { $exists: false } })
      .select('name slug')
      .setOptions({ skipMiddleware: true });

    for (const tour of tours) {
      tour.slug = slugify(tour.name, { lower: true });
      await tour.save({ validateBeforeSave: false });
      console.log(`Generated slug for: ${tour.name}`);
    }

    console.log('🎉 All missing slugs created!');
  } catch (err) {
    console.error('💥 Error generating slugs:', err);
  } finally {
    await mongoose.connection.close();
    console.log('🔒 DB connection closed.');
  }
}

generateSlugs();
