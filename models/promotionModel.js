const mongoose = require('mongoose');

// promoted products that will be displayed in home page
const promotionSchema = mongoose.Schema({
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
    },
    photo: {
        type: String,
        default: 'no-photo.jpg'
    }
});

const Promotion = mongoose.model('Promotion', promotionSchema);

module.exports = Promotion;