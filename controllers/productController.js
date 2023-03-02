const CustomError = require('../helpers/customError');
const asyncHandler = require('../middlewares/asyncHandler');
const Product = require('../models/productModel');
const Observer = require('../models/observerModel');

// @desc        Get all products -- or use SearchQuery
// @route       Get /api/products
// @access      Public
exports.getAllProducts = asyncHandler(async (req, res, next) => {
  // Get Views from Observer
  const { views } = await Observer.findById('63f8cf3f3b28178e037c263d');
  // Get all products or specify from query parameters
  const products = await Product.find(req.query);
  res.status(200).json({
    success: true,
    count: products.length,
    views: views,
    data: products
  });
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
  const x = `${req.protocol}://${req.hostname}:3000/${
    req.file ? req.params.id + '_' + req.file.originalname : 'for testing only'
  }`;
  req.body.photo = x;
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    data: product
  });
});

// @desc        Update product
// @route       Patch /api/products/:id
// @access      Private
exports.updateProduct = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  if (req.file) {
    const x = `${req.protocol}://${req.hostname}:3000/${
      req.file
        ? req.params.id + '_' + req?.file.originalname
        : 'for testing only'
    }`;
    req.body.photo = x;
  }
  console.log(req.body);
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

// @desc        Upload photo for bootcamp
// @route       PUT /api/products/:id/photo
// @access      Private
exports.uploadProductPhoto = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(
      new CustomError(`Product not found with id of ${req.params.id}`, 404)
    );
  }

  if (!req.file) {
    return next(new CustomError('Please upload a file', 400));
  }

  const imgPath = `${req.protocol}://${req.hostname}:${process.env.PORT}/${req.params.id}_${req.file.originalname}`;

  await Product.findByIdAndUpdate(req.params.id, { photo: imgPath });

  res.status(200).json({ success: true, data: imgPath });
});
