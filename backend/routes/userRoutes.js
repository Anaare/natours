const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { uploadUserPhoto } = require('../utils/upload');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// Mounting protect middleware to protect ALL routes that comes after it
router.use(authController.protect);

router.patch(
  '/updateMyPassword',

  authController.updatePassword,
);

router.get(
  '/me',
  authController.protect,
  userController.getMe,
  userController.getUser,
);

router.get(
  '/my-bookings',
  authController.protect,
  userController.getMyBookings,
);

router.get('/my-reviews', userController.getMyReviews);

router.patch(
  '/updateMe',
  uploadUserPhoto.single('photo'),
  userController.updateMe,
);
router.delete('/deleteMe', userController.deleteMe);

// router.use(authController.restrictTo('admin'));

router.route('/').get(userController.getAllUsers);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
