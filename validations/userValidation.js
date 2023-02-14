const Joi = require('joi');

const joiSchema = Joi.object({
    username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

    email: Joi.string()
    .email()
    .lowercase()
    .min(10)
    .max(30)
    .required(),

    password: Joi.string()
    .min(4)
    .max(10)
    .required()
    .pattern(new RegExp('^[a-zA-Z0-9]')),

    gender: Joi.string()
    .alphanum()
    .min(1)
    .max(1)
    .required()
});

module.exports = joiSchema