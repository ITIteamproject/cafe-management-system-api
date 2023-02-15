const mongoose = require('mongoose');
// const Schema = mongoose.Schema

// Schemas
const AdminSchema = new mongoose.Schema({
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
//   orders: [{
//     type: Schema.Types.ObjectId,
//     ref: 'Order'
//   }]
});

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin
