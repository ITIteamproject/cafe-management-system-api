const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Schemas
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  tel: {
    type: Number,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  gender: {
    type: String,
    required: true
  },
  userImage: {
    type: String,
    required: false
  },
  orders: [{
    type: Schema.Types.ObjectId,
    ref: 'Order'
  }]
});

const User = mongoose.model('User', UserSchema);

module.exports = User
