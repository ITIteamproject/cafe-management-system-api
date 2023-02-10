const express = require('express')
const { userValidation } = require('../middlewares/userMiddlewares')
const { User } = require('../models')
const customError = require('../customError')
const {
    comparePassword,
    signUserToken,
    hashPassword 
} = require('../helpers/userHelpers')

const userRouter = express.Router()

// Sign Up
userRouter.post('/signup', userValidation, async (req, res, next) => {
    const { username, email, password, confirmPassword, gender } = req.body;

    const existEmail = await User.findOne({ email });
    if (existEmail) {
        res.status(404).send('username alredy exist');
    } else {
        if (password != confirmPassword) {
            res.status(404).send('password not match!');
        } else {
            if (gender != 'f' && gender != 'm') {
                res.status(404).send('please enter f or m for gender');
            } else {
                try {
                    const hashedPassword = await hashPassword(password);
                    await User.create({
                        username,
                        email,
                        password: hashedPassword,
                        confirmPassword: hashedPassword,
                        gender
                    });
                    res.status(200).send('sign up succssesfully');

                } catch (error) {
                    next(error);
                }
            }
        }
    }
});

// Login
userRouter.post('/login', userValidation, async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) throw customError(401, 'invalid username or password');
        await comparePassword(password, user.password);
        const token = await signUserToken(user.id);
        res.status(200).send({ accessToken: token, data: 'logged in succssesfully' });
    } catch (error) {
        next(error);
    }
})

// get all users
// just for development purposes
userRouter.get('/', async (req, res, next) => {
    const allusers = await User.find({})
    res.status(200).json(allusers)
})

module.exports = userRouter