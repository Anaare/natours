const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

// By default each router only has access to it's own route's params.
// In order to get access to params like tourId etc we need mergeParams set to true
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.createReview,
  );

module.exports = router;
