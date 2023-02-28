const express = require("express");

const userProfileRouter = express.Router();

const imageUpload = require("../helpers/imageHelper");
const customError = require("../customError");
const User = require("../models/userModel");
const { comparePassword, hashPassword } = require("../helpers/userHelpers");
const { authorizeUser } = require("../middlewares/userMiddlewares");

// get user info
userProfileRouter.get("/", authorizeUser, async (req, res, next) => {
    try {
        const { id } = req.params;
        const userInfo = await User.findById(id, "username email gender"); // if not found it will throw error implicitly

        res.status(200).json(userInfo);
    } catch (error) {
        next(customError(404, "not found"));
    }
});

// edit user info (username, email, gender)
userProfileRouter.patch("/", authorizeUser, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { username, email, gender } = req.body;
        console.log(req.body);

        const userInfo = {
            username,
            email,
            gender,
        };
        const updatedInfo = await User.findByIdAndUpdate(id, userInfo, {
            new: true,
        });

        res.status(200).json(updatedInfo);
    } catch (error) {
        next(error);
    }
});
// edit username
userProfileRouter.patch("/username", authorizeUser, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { username } = req.body;

        const { username: updatedName } = await User.findByIdAndUpdate(
            id,
            { username },
            { new: true }
        );
        res.status(200).send({ username: updatedName });
    } catch (error) {
        next(customError(401, "unauthorized"));
    }
});

// edit email
userProfileRouter.patch("/email", authorizeUser, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { email } = req.body;

        const { email: updatedEmail } = await User.findByIdAndUpdate(
            id,
            { email },
            { new: true }
        );
        res.status(200).send({ email: updatedEmail });
    } catch (error) {
        next(customError(401, "unauthorized"));
    }
});

// edit gender
userProfileRouter.patch("/gender", authorizeUser, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { gender } = req.body;

        if (gender !== "male" && gender !== "female")
            throw customError(404, "invalid input");

        const { gender: updatedGender } = await User.findByIdAndUpdate(
            id,
            { gender },
            { new: true }
        );
        res.status(200).send({ gender: updatedGender });
    } catch (error) {
        next(error);
    }
});

// change passwd
userProfileRouter.patch(
    "/changepassword",
    authorizeUser,
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const { oldPassword, newPassword } = req.body;

            if (!oldPassword || !newPassword)
                throw customError(404, "old and new passwords are required");

            const { password: hashedPW } = await User.findById(id);
            await comparePassword(oldPassword, hashedPW);

            // hash new password
            const hashpw = await hashPassword(newPassword);
            await User.findByIdAndUpdate(id, { password: hashpw });

            res.status(200).send({ isUpdated: true });
        } catch (error) {
            next(error);
        }
    }
);

// get user picture
userProfileRouter.get("/userImage", authorizeUser, async (req, res, next) => {
    try {
        const { id } = req.params;

        const userImage = await User.findById(id, "userImage -_id"); // return only userImage and exclude _id
        if (!userImage) throw customError(401, "unauthorized");

        res.status(200).json(userImage);
    } catch (error) {
        next(error);
    }
});

// edit user picture
userProfileRouter.patch(
    "/userImage",
    authorizeUser,
    imageUpload.single("userImage"),
    async (req, res, next) => {
        try {
            const { id } = req.params;

            // store image url
            // const imagePath = `${req.protocol}://${req.hostname}:${process.env.PORT}/${id}_${req.file.originalname}`
            const imagePath = `${req.protocol}://${req.hostname}/${id}_${req.file.originalname}`;

            const { userImage: updatedImage } = await User.findByIdAndUpdate(
                id,
                { userImage: imagePath },
                { new: true }
            );
            if (!updatedImage) throw customError(401, "unauthorized");

            res.status(200).send({ userImage: updatedImage });
        } catch (error) {
            next(error);
        }
    }
);

// get all users
userProfileRouter.get("/all", async (req, res, next) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

module.exports = userProfileRouter;
