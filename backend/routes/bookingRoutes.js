const express = require('express');

const bookingController = require('./../controllers/bookingController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/checkout-session/:tourId')
  .get(authController.protect, bookingController.getCheckoutSession)
  .post(authController.protect, bookingController.createBooking);

router.route('/all-bookings').get(bookingController.getAllBookings);

router.use(authController.restrictTo('admin', 'lead-guide'));

router
  .route('/:id')
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

module.exports = router;
