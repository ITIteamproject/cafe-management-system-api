const express = require('express');
const productController = require('../controllers/productController');
const imageUpload = require('../helpers/imageHelper');
const dailyViews = require('../helpers/dailyViews');

const router = express.Router();

router
  .route('/')
  .get(
    dailyViews.checkNewDay,
    dailyViews.updateViews,
    productController.getAllProducts
  )
  .post(imageUpload.single('photo'), productController.createProduct);

router
  .route('/:id')
  .get(productController.getProduct)
  .patch(imageUpload.single('photo'), productController.updateProduct) ////
  .delete(productController.deleteProduct);

router
  .route('/:id/photo')
  .put(imageUpload.single('photo'), productController.uploadProductPhoto);

module.exports = router;
