const CustomError = require('../helpers/customError');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    error = new CustomError(`Resource not found with id of ${err.value}`, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    error = new CustomError(`Resource already exists`, 400);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = new CustomError(message, 400);
  }
  res
    .status(error.statusCode || 500)
    .json({ success: false, message: error.message || 'Server error' });
};
module.exports = errorHandler;
