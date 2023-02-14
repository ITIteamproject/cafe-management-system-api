const util = require('util')
const express = require('express')
const customError = require('../customError')
const Order = require('../models/orderModel')
const User = require('../models/userModel');
const purchaseRouter = express.Router()

const jwt = require('jsonwebtoken');
const verifyAsync = util.promisify(jwt.verify);
const secretKey = process.env.SECRET_KEY || 'hgdnckhnd';

// usertoken
// productId
// status
purchaseRouter.post('/', async (req, res, next) => {
    try {
        const productIds = req.body // array of product ids
        const { authorization: token } = req.headers
        const payload = await verifyAsync(token, secretKey);
        const userId = payload.id

        // get user
        const user = await User.findById(userId)
        let order;
        // create orders for user
        for (let i = 0; i < productIds.length; i++) {
            order = await Order.create({
                userId,
                productId: productIds[i],
                status: 'pending'
            })

            // push order id to user orders
            user.orders.push(order._id)
            await user.save()
        }

        const userOrders = await user.populate('orders')
       
        res.status(200).send(userOrders.orders)

    } catch (error) {
        next(error)
    }

})

module.exports = purchaseRouter