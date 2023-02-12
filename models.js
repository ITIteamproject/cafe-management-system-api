const mongoose = require('mongoose');

// Schemas
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
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
    required: true
  },
  address: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  userImage: {
    type: String,
    required: false
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = {
  User
};
