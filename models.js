const mongoose = require('mongoose');

// Schemas
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    }
});

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please add a price']
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [200, 'Description can not be more than 200 characters']
    }
});

// Models
const User = mongoose.model('User', UserSchema)
const Product = mongoose.model('Product', productSchema)

// export all models created
module.exports = {
    User,
    Product
}