const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        index: true
    },
    role: {
        type: String,
        default: 'client'
    },
    cart: {
        type: Array,
        default: []
    },
    address: String,
    wishlist: [{ type: ObjectId, ref: 'Product'}],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema); // We define the model User and refer it to this schema