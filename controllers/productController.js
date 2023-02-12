const CustomError = require('../helpers/customError');
const asyncHandler = require('../middlewares/asyncHandler');
const Product = require('../models/productModel');

// @desc        Get all products
// @route       Get /api/products
// @access      Public
exports.getAllProducts = asyncHandler(async (req, res, next) => {
  // Get all products or specify from query parameters
  const products = await Product.find(req.query);
  res
    .status(200)
    .json({ success: true, count: products.length, data: products });
});

// @desc        Get product
// @route       Get /api/products/:id
// @access      Public
exports.getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new CustomError(`Product not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: product });
});

// @desc        Create product
// @route       Post /api/products/:id
// @access      Private
exports.createProduct = asyncHandler(async (req, res, next) => {
  const imagePath = `${req.protocol}://${req.hostname}:${process.env.PORT}/${req.file.originalname}`;
  const product = await Product.create({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    photo: imagePath
  });
  res.status(201).json({
    success: true,
    data: product
  });
});

// @desc        Update product
// @route       Patch /api/products/:id
// @access      Private
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!product) {
    return next(
      new CustomError(`Product not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: product });
});

// @desc        Delete product
// @route       Delete /api/products/:id
// @access      Private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(
      new CustomError(`Product not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(204).json({ success: true, date: {} });
});
