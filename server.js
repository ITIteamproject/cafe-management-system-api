require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// const errorHandler = require('./middlewares/errorHandler');
const Registration = require('./routers/registration');
const AdminRouter = require('./routers/adminRouter');
const ProfileRouter = require('./routers/profile');
const productRouter = require('./routers/productRouter');
const purchaseRouter = require('./routers/purchase');
const orderRouter = require('./routers/order');
const promotionRouter = require('./routers/promotion')

app.use(cors())
app.use(express.json());
app.use(express.static('uploads'));

// app.use(express.static('public')) // for testing purposes

app.use('/reg', Registration); // login signup
app.use('/admin', AdminRouter); // admin
app.use('/profile', ProfileRouter);
app.use('/api/products', productRouter);
app.use('/promotions', promotionRouter);
app.use('/purchase', purchaseRouter);
app.use('/orders', orderRouter);

// app.use(errorHandler);

// Same Code embedded in at EndOfFile ./middlewares/errorHandler.js
app.use((err, req, res, next) => {
  if (!err.statusCode) err.message = 'something went wrong';
  res.status(err.statusCode || 500).send(err.message);
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});

// connect to database
// mongo atlas url-> mongodb+srv://member:member123@cluster.cmlunqp.mongodb.net/cafeDB
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB, err => {
  if (err) console.log(err, "can't connect to database");
  else console.log(`connected to DB on ${mongoose.connection.host}`);
});
