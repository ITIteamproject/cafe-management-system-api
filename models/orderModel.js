const mongoose = require('mongoose');
const Schema = mongoose.Schema

// userid
// status
// productId

const orderShema = new mongoose.Schema({
    userId: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    productId: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    status: {
        type: String,
        enum :['pending' , 'rejected' , 'accepted']
    }
})

const Order = new mongoose.model('Order', orderShema)

module.exports = Order