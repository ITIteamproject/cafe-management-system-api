const Joi = require('joi');

const joiSchema = Joi.object({
    username: Joi.string()
    .alphanum()
    .min(3)
    .max(30),

    email: Joi.string()
    .email(),

    password: Joi.string()
    .alphanum()
    .min(4),

    confirmPassword: Joi.string()
    .alphanum()
    .min(4),

    gender: Joi.string()
    .alphanum()
});

module.exports = joiSchema