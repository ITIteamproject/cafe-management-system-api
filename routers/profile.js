const express = require('express')

const userProfileRouter = express.Router()

const imageUpload = require('../helpers/imageHelper')
const customError = require('../customError')
const { User } = require('../models')
const {comparePassword, hashPassword} = require('../helpers/userHelpers')

userProfileRouter.use(express.static('uploads'))

// get user info
userProfileRouter.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const userInfo = await User.findById(id) // if not found it will throw error implicitly
        res.status(200).json({ userInfo })

    } catch (error) {
        next(customError(404, 'not found'))
    }
})

// edit username
userProfileRouter.patch('/username/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const { username } = req.body

        await User.findByIdAndUpdate(id, { username })
        res.status(200).send('username updated successfully')
    } catch (error) {
        next(customError(401, 'unauthorized'))
    }
})

// edit email
userProfileRouter.patch('/email/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const { email } = req.body

        await User.findByIdAndUpdate(id, { email })
        res.status(200).send('email updated successfully')
    } catch (error) {
        next(customError(401, 'unauthorized'))
    }
})

// edit gender
userProfileRouter.patch('/gender/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const { gender } = req.body

        if (gender !== 'male' && gender !== 'female') throw customError(404, 'invalid input')

        await User.findByIdAndUpdate(id, { gender })
        res.status(200).send('gender updated successfully')
    } catch (error) {
        next(error)
    }
})

// change passwd
userProfileRouter.patch('/changepassword/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const { oldPassword, newPassword } = req.body
        
        if (!oldPassword || !newPassword) throw customError(404, 'old and new passwords are required')

        const {password: hashedPW} = await User.findById(id)
        await comparePassword(oldPassword, hashedPW)

        // hash new password
        const hashpw = await hashPassword(newPassword)
        await User.findByIdAndUpdate(id, { password: hashpw })

        res.status(200).send('password updated successfully')

    } catch (error) {
        next(error)
    }
})

// get user picture
userProfileRouter.get('/userImage/:id', async (req, res, next) => {
    try {
        const { id } = req.params

        const userImage = await User.findById(id, 'userImage -_id') // return only userImage and exclude _id
        console.log(userImage)
        if(!userImage) throw customError(401, 'unauthorized')

        res.status(200).send(userImage)

    } catch (error) {
        next(error)
    }
})

// edit user picture
userProfileRouter.patch('/userImage/:id', imageUpload.single('userImage'), async (req, res, next) => {
    try {
        const { id } = req.params

        // store image url
        const imagePath = `${req.protocol}://${req.hostname}:${process.env.PORT}/${id}${req.file.originalname}`
        
        const updateUser = await User.findByIdAndUpdate(id, { userImage: imagePath })
        if(!updateUser) throw customError(401, 'unauthorized')

        res.status(200).send('done')

    } catch (error) {
        next(error)
    }
})

// get all orders by user id (with validation)

// cancel pending order 

module.exports = userProfileRouter