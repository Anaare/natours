const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 1. Storage for USERS (Profile Picture)
const userStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'natours-users',
    allowed_formats: ['jpeg', 'png', 'jpg'],
  },
});
// 2. Storage for TOURS (Cover Image + Gallery Images)
const tourStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'natours-tours', // A dedicated folder for tours
    allowed_formats: ['jpeg', 'png', 'jpg'],
  },
});

// Multer instance for User Profile Photos (Single file)
exports.uploadUserPhoto = multer({
  storage: userStorage,
});

// Multer instance for Tour Photos (Multiple files)
exports.uploadTourImages = multer({
  storage: tourStorage,
});
