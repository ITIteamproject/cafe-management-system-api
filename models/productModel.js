const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: true,
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [200, 'Description can not be more than 200 characters']
  },
  photo: {
    type: String,
    default: 'no-photo.jpg'
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
