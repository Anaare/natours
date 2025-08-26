class APIFeatures {
  // Query is an object that is a result of calling a method like .find()
  // Query String is URL (req.query) part ?sort=price&limit=10
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // 1A) FILTERING
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B) ADVANCED FILTERING
    const newQueryObj = {};
    for (const key in queryObj) {
      if (key.includes('[')) {
        const parts = key.split('[');
        const field = parts[0];
        const operator = `$${parts[1].slice(0, -1)}`;
        newQueryObj[field] = {
          [operator]: queryObj[key],
        };
      } else {
        newQueryObj[key] = queryObj[key];
      }
    }

    this.query = this.query.find(newQueryObj);

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this; // Crucial for chaining
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this; // Crucial for chaining
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this; // Crucial for chaining
  }
}

module.exports = APIFeatures;
