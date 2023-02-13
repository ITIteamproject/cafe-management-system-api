const express = require('express');
const productController = require('../controllers/productController');
const imageUpload = require('../helpers/imageHelper');

const router = express.Router();

router
  .route('/')
  .get(productController.getAllProducts)
  .post(imageUpload.single('photo'), productController.createProduct);

router
  .route('/:id')
  .get(productController.getProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

router
  .route('/:id/photo')
  .put(imageUpload.single('photo'), productController.uploadProductPhoto);

module.exports = router;
