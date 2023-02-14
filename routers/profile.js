const express = require('express')

const userProfileRouter = express.Router()

const imageUpload = require('../helpers/imageHelper')
const customError = require('../customError')
const User = require('../models/userModel')
const Order = require('../models/orderModel')
const { comparePassword, hashPassword } = require('../helpers/userHelpers')
const { authorizeUser } = require('../middlewares/userMiddlewares')

// get user info
userProfileRouter.get('/', authorizeUser, async (req, res, next) => {
    try {
        const { id } = req.params
        const userInfo = await User.findById(id, 'username email gender') // if not found it will throw error implicitly
        res.status(200).json(userInfo)

    } catch (error) {
        next(customError(404, 'not found'))
    }
})

// edit username
userProfileRouter.patch('/username', authorizeUser, async (req, res, next) => {
    try {
        const { id } = req.params
        const { username } = req.body

        const { username: updatedName } = await User.findByIdAndUpdate(id, { username })
        res.status(200).send({ username: updatedName }) // returns the old username
    } catch (error) {
        next(customError(401, 'unauthorized'))
    }
})

// edit email
userProfileRouter.patch('/email', authorizeUser, async (req, res, next) => {
    try {
        const { id } = req.params
        const { email } = req.body

        const { email: updatedEmail } = await User.findByIdAndUpdate(id, { email })
        res.status(200).send({ email: updatedEmail }) // returns the old email
    } catch (error) {
        next(customError(401, 'unauthorized'))
    }
})

// edit gender
userProfileRouter.patch('/gender', authorizeUser, async (req, res, next) => {
    try {
        const { id } = req.params
        const { gender } = req.body

        if (gender !== 'male' && gender !== 'female') throw customError(404, 'invalid input')

        const { gender: updatedGender } = await User.findByIdAndUpdate(id, { gender })
        res.status(200).send({ gender: updatedGender }) // returns the old email
    } catch (error) {
        next(error)
    }
})

// change passwd
userProfileRouter.patch('/changepassword', authorizeUser, async (req, res, next) => {
    try {
        const { id } = req.params
        const { oldPassword, newPassword } = req.body

        if (!oldPassword || !newPassword) throw customError(404, 'old and new passwords are required')

        const { password: hashedPW } = await User.findById(id)
        await comparePassword(oldPassword, hashedPW)

        // hash new password
        const hashpw = await hashPassword(newPassword)
        await User.findByIdAndUpdate(id, { password: hashpw })

        res.status(200).send({ isUpdated: true })

    } catch (error) {
        next(error)
    }
})

// get user picture
userProfileRouter.get('/userImage', authorizeUser, async (req, res, next) => {
    try {
        const { id } = req.params

        const userImage = await User.findById(id, 'userImage -_id') // return only userImage and exclude _id
        if (!userImage) throw customError(401, 'unauthorized')

        res.status(200).send(userImage)

    } catch (error) {
        next(error)
    }
})

// edit user picture
userProfileRouter.patch('/userImage', authorizeUser, imageUpload.single('userImage'), async (req, res, next) => {
    try {
        const { id } = req.params

        // store image url
        const imagePath = `${req.protocol}://${req.hostname}:${process.env.PORT}/${id}${req.file.originalname}`

        const { userImage: updatedImage } = await User.findByIdAndUpdate(id, { userImage: imagePath })
        if (!updatedImage) throw customError(401, 'unauthorized')

        res.status(200).send({ userImage: updatedImage })

    } catch (error) {
        next(error)
    }
})

// get all orders by user id (with validation)
userProfileRouter.get('/orders', authorizeUser, async (req, res, next) => {
    try {
        const { id } = req.params
        const userOrders = await Order.find({ userId: id })

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
userProfileRouter.patch('')

module.exports = userProfileRouter