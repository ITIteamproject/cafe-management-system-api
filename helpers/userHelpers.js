const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const util = require('util')

const customError = require('../customError')

const saltRounds = 10;
const secretKey = process.env.SECRET_KEY || "hgdnckhnd"
const signAsync = util.promisify(jwt.sign)

const hashPassword = async (password) => await bcrypt.hash(password, saltRounds);

const comparePassword = async (password, hash) => {
    const isMath = await bcrypt.compare(password, hash)
    if (!isMath) throw customError(401, 'invalid email or password')
}

// grand token to user 
const signUserToken = (id) => signAsync({ id }, secretKey)

module.exports = {
    comparePassword,
    hashPassword,
    signUserToken
}