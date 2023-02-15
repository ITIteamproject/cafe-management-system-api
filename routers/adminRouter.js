const express = require('express');
// const { userValidation } = require('../middlewares/userMiddlewares');
const Admin = require('../models/adminModel');
const customError = require('../customError');
const {
    comparePassword,
    signUserToken,
    hashPassword
} = require('../helpers/userHelpers');

const adminRouter = express.Router();

// Sign Up
adminRouter.post('/signup', async (req, res, next) => {
    const { username, email, password, confirmPassword, gender } = req.body;
    console.log(req.body);
    const emailExits = await Admin.findOne({ email });
    if (emailExits) {
        res.status(404).send('username alredy exist');
    } else {
        try {
            const hashedPassword = await hashPassword(password);
            const admin = await Admin.create({
                username,
                email,
                password: hashedPassword,
                confirmPassword: hashedPassword,
                gender
            });
            const token = await signUserToken(admin._id);
            res.status(200).send({ accessToken: token });
        } catch (error) {
            next(error);
        }
    }
});

// Login
adminRouter.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });
        if (!admin) throw customError(401, 'invalid email or password');
        await comparePassword(password, admin.password);
        const token = await signUserToken(admin.id);
        res.status(200).send({ accessToken: token });
    } catch (error) {
        next(error);
    }
});

// get all admins
// just for development purposes
adminRouter.get('/', async (req, res, next) => {
    const alladmins = await Admin.find({});
    res.status(200).json(alladmins);
});

module.exports = adminRouter;
