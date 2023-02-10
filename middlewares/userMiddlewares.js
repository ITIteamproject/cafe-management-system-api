const util = require('util');
const jwt = require('jsonwebtoken');
const joiSchema = require('../validations/userValidation')

const verifyAsync = util.promisify(jwt.verify);
const secretKey = process.env.SECRET_KEY || 'hgdnckhnd';

const authorizeUser = async (req, res, next) => {
    const { id } = req.params;
    const { authorization: token } = req.headers;
    try {
        const payload = await verifyAsync(token, secretKey);
        if (payload.id !== id)
            throw customError(403, 'you are not authorized to perform this action!');
        next();
    } catch (error) {
        next(customError(403, 'you are not authorized to perform this action!'));
    }
}

const userValidation = async (req, res, next) => {
    try {
        await joiSchema.validateAsync(req.body);
        next();
    } catch (error) {
        error.statusCode = 422;
        next(error);
    }
};

module.exports = {
    userValidation,
    authorizeUser
};