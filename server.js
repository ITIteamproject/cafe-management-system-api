require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')

const app = express()
const port = process.env.PORT || 3000

const Registration = require('./routers/registration')
const ProfileRouter = require('./routers/profile')

app.use(express.json())
app.use(express.static('uploads'))
// app.use(express.static('public')) // for testing purposes

app.use('/reg', Registration) // login signup
app.use('/profile', ProfileRouter)

// error handling middleware
app.use((err, req, res, next) => {
    if(!err.statusCode) err.message = 'something went wrong'
    res.status(err.statusCode || 500).send(err.message)
})

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
})

// connect to database 
// mongo atlas url-> mongodb+srv://member:member123@cluster.cmlunqp.mongodb.net/cafeDB
mongoose.set('strictQuery', true)
mongoose.connect('mongodb://127.0.0.1:27017/itiProject', (err) => {
    if (err) console.log(err, "can't connect to database");
    console.log('connected to db successfully');
});