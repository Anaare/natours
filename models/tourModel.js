const mongoose = require('mongoose');

// 1. Create Schema for a database!
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

// 2. Create a model for the Schema
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
