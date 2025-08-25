const express = require('express');
const tourController = require('../controllers/tourController');

/* 
tourController is an object containing all functions that I exported 
from a controller therefore all methods must be called on it! 
*/

const router = express.Router();

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour); // This is CHAINING multiple middlewares

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
