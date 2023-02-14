const express = require('express')
const Order = require('../models/orderModel')
const { authorizeUser } = require('../middlewares/userMiddlewares')
const customError = require('../customError')

const orderRouter = express.Router()

// get all orders by user id (with validation)
orderRouter.get('/', authorizeUser, async (req, res, next) => {
    try {
        const { id } = req.params
        const userOrders = await Order.find({ userId: id })
        if(!userOrders) throw customError(404, 'orders not found')

        let popOrders = [];
        for(let i=0; i<userOrders.length; i++) {
            const order = await userOrders[i].populate('productId')
            popOrders.push(order)
        }

        res.status(200).json(popOrders)
    } catch (error) {
        next(error)
    }
})

// cancel pending order 
orderRouter.patch('/', authorizeUser, async (req, res, next) => {
    try {
        const { id } = req.params
        
    } catch (error) {
        next(error)
    }
})


module.exports = orderRouter