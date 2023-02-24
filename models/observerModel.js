const mongoose = require('mongoose');

const ObserverSchema = mongoose.Schema({
  views: {
    type: Number,
    default: 0
  },
  requestDate: {
    type: Date,
    default: Date.now
  }
});

const Observer = mongoose.model('Observer', ObserverSchema);

module.exports = Observer;
