const Tour = require('../models/tourModel');

exports.getAllTours = async (req, res) => {
  try {
    // 1A) FILTERING
    const queryObj = { ...req.query }; // Create shallow copy of the query Obj
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]); // delete JS method

    // If I use await  const tours = await Tour.find(queryObj); here I'll get FINAL result/query
    // and WON'T be able to chain ANYTHING!!
    //  1B) ADVANCED FILTERING
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    const newQueryObj = {};
    for (const key in queryObj) {
      if (key.includes('[')) {
        // Splits 'duration[gte]' into ['duration', 'gte]']
        const parts = key.split('[');
        // Gets 'duration'
        const field = parts[0];
        // Gets 'gte' and adds $
        const operator = `$${parts[1].slice(0, -1)}`;
        // Creates nested object
        newQueryObj[field] = {
          [operator]: queryObj[key],
        };
      } else {
        newQueryObj[key] = queryObj[key];
      }
    }

    let query = Tour.find(newQueryObj);

    // Filtering with Mongoose built-in methods
    /*
    const query = await Tour.find()
      .where('difficulty')
      .equals('easy')
      .where('duration')
      .equals(5);*/

    // 2) SORTING
    if (req.query.sort) {
      console.log(req.query.sort);

      query = query.sort(req.query.sort.replace(',', ' '));

      // Default one to sort newest first
    } else {
      query = query.sort('-createdAt');
    }

    // 3) Field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select('name duration price difficulty');
    } else {
      query = query.select('-__v');
    }

    // 4) PAGINATION
    const page = req.query.page * 1 || 1; //converting a str to number
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip >= numTours) throw new Error('This page does not exist');
    }
    // EXECUTE QUERY
    const tours = await query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours: tours,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: 'Could NOT get tours',
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: 'Could NOT get tour',
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({ status: 'success', data: { tour: newTour } });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Data was NOT updated',
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: {
        tour: null,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Data was NOT updated',
    });
  }
};
