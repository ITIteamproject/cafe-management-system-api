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
  gender: {
    type: String,
    required: true
  },
  userImage: {
    type: String,
    required: false
  }
});

// Models
const User = mongoose.model('User', UserSchema);

// export all models created
module.exports = {
  User
};
