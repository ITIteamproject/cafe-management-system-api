const mongoose = require('mongoose');
const Schema = mongoose.Schema

const orderShema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    amount: Number,
    totalPrice: Number,
    status: {
        type: String,
        enum :['pending' , 'rejected' , 'accepted']
    }
})

const Order = mongoose.model('Order', orderShema)

module.exports = Order