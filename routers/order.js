const express = require("express");
const Order = require("../models/orderModel");
const User = require("../models/userModel");
const { authorizeUser } = require("../middlewares/userMiddlewares");
const customError = require("../customError");

const orderRouter = express.Router();

// get all use orders
orderRouter.get("/", authorizeUser, async (req, res, next) => {
    try {
        const { id } = req.params;
        const userOrders = await Order.find({ userId: id });
        if (!userOrders) throw customError(404, "orders not found");

        let popOrders = [];
        for (let i = 0; i < userOrders.length; i++) {
            const order = await userOrders[i].populate("productId");
            popOrders.push(order);
        }

        res.status(200).json(popOrders);
    } catch (error) {
        next(error);
    }
});

// cancel pending order
orderRouter.delete("/", authorizeUser, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { orderId } = req.query; // ?orderid=123

        const user = await User.findById(id);
        if (!user) throw customError(404, "user not found");

        // remove order document
        const order = await Order.findByIdAndDelete(orderId);
        if (!order) throw customError(404, "order not found");

        // remove order id from user
        const i = user.orders.indexOf(orderId);
        if (i == -1) throw customError(404, "order not found");
        user.orders.splice(i, 1);
        user.save();

        // send the updated orders to user
        const userOrders = await Order.find({ userId: id });
        if (!userOrders) throw customError(404, "orders not found");

        let popOrders = [];
        for (let i = 0; i < userOrders.length; i++) {
            const order = await userOrders[i].populate("productId");
            popOrders.push(order);
        }

        res.status(200).json(popOrders);
    } catch (error) {
        next(error);
    }
});

// get all orders
orderRouter.get("/all", async (req, res, next) => {
    try {
        const orders = await Order.find({});
        if (!orders) throw customError(404, "orders not found");

        let popOrders = [];
        for (let i = 0; i < orders.length; i++) {
            const order = await orders[i].populate("productId");
            // const user = await orders[i].populate("userId");
            // popOrders.push(order, user);
            popOrders.push(order);
        }

        res.status(200).json(popOrders);
    } catch (error) {
        next(error);
    }
});

// change order status
orderRouter.patch("/:id", async (req, res, next) => {
    try {
        const { id } = req.params; // order id
        const { status } = req.body;
        if (!status)
            throw customError(401, "you didn't attached the order status");
        if (status !== "accepted" && status !== "rejected")
            throw customError(401, "order status incorrect");

        const order = await Order.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );
        res.status(200).json(order);
    } catch (error) {
        next(error);
    }
});

module.exports = orderRouter;
