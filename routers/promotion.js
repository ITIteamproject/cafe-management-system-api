const express = require('express')
const promotinoRouter = express.Router()

const customError = require('../customError')
const Promotion = require('../models/promotionModel')

promotinoRouter.get('/', async (req, res, next) => {
    try {
        const promotions = await Promotion.find({})
        if(!promotions) throw customError(404, 'promotion products not found')

        res.status(200).json(promotions) // returns array of promoted products
    } catch (error) {
        next(error)
    }
})

module.exports = promotinoRouter