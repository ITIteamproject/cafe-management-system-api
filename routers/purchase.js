const express = require('express')
const customError = require('../customError')
const purchaseRouter = express.Router()

const jwt = require('jsonwebtoken');
const verifyAsync = util.promisify(jwt.verify);
const secretKey = process.env.SECRET_KEY || 'hgdnckhnd';


// usertoken
// productId
// status
purchaseRouter.post('/', async (req, res, next) => {
    try {
        const productIds = req.body // array of product ids
        const {authorization: token} = req.headers
        const payload = await verifyAsync(token, secretKey);
        const id = payload.id

        


    } catch (error) {
        
    }
    
})

module.exports = purchaseRouter