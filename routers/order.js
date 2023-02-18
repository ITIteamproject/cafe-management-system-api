const express = require('express')
const Order = require('../models/orderModel')
const User = require('../models/userModel')
const { authorizeUser } = require('../middlewares/userMiddlewares')
const customError = require('../customError')

const orderRouter = express.Router()

// get all use orders
orderRouter.get('/', authorizeUser, async (req, res, next) => {
    try {
        const { id } = req.params
        const userOrders = await Order.find({ userId: id })
        if (!userOrders) throw customError(404, 'orders not found')

        let popOrders = [];
        for (let i = 0; i < userOrders.length; i++) {
            const order = await userOrders[i].populate('productId')
            popOrders.push(order)
        }

        res.status(200).json(popOrders)
    } catch (error) {
        next(error)
    }
})

// cancel pending order
orderRouter.delete('/', authorizeUser, async (req, res, next) => {
    try {
        const { id } = req.params
        const { orderId } = req.query // ?orderid=123

        const user = await User.findById(id)
        if (!user) throw customError(404, 'user not found')

        // remove order
        const order = await Order.findByIdAndDelete(orderId)
        if (!order) throw customError(404, 'order not found')

        // remove order id from user
        const i = user.orders.indexOf(orderId)
        if (i == -1) throw customError(404, 'order not found')
        user.orders.splice(i, 1)
        user.save()

        res.status(200).json({ isCanceled: true })
    } catch (error) {
        next(error)
    }
})

module.exports = orderRouter