const express = require('express');

const bookingController = require('./../controllers/bookingController');
const authController = require('./../controllers/authController');

const router = express.Router();

// router.route('/all-bookings').get(bookingController.getAllBookings);

router.get('/all-bookings', bookingController.getAllBookings);

router.get('/:tourId', bookingController.getBooking);

router
  .route('/checkout-session/:tourId')
  .get(authController.protect, bookingController.getCheckoutSession)
  .post(authController.protect, bookingController.createBooking);

module.exports = router;
