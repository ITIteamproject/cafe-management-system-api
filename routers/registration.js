const express = require('express')
const { userValidation } = require('../middlewares/userMiddlewares')
const User = require('../models/userModel')
const customError = require('../customError')
const {
    comparePassword,
    signUserToken,
    hashPassword
} = require('../helpers/userHelpers')

const userRouter = express.Router()

// Sign Up
userRouter.post('/signup', async (req, res, next) => {
    const { username, email, password, repassword, gender } = req.body;
    console.log(req.body)
    const emailExits = await User.findOne({ email });
    if (emailExits) {
        res.status(404).send('username alredy exist');
    } else {
        if (password != repassword) {
            res.status(404).send('password not match!');
        } else {
            if (gender != 'female' && gender != 'male') {
                res.status(404).send('please enter f or m for gender');
            } else {
                try {
                    const hashedPassword = await hashPassword(password);
                    const user = await User.create({
                        username,
                        email,
                        password: hashedPassword,
                        gender,
                        userImage: `${req.protocol}://${req.hostname}:${process.env.PORT}/defProfileImage.png`
                    });
                    const token = await signUserToken(user._id)
                    res.status(200).send({accessToken: token});

                } catch (error) {
                    next(error);
                }
            }
        }
    }
});

// Login
userRouter.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) throw customError(401, 'invalid email or password');
        await comparePassword(password, user.password);
        const token = await signUserToken(user.id);
        res.status(200).send({ accessToken: token });
    } catch (error) {
        next(error);
    }
})

module.exports = userRouter