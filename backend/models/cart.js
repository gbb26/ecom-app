const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    cartItems: [{
        productID: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        },
        totalPrice: {
            type: Number,
            required: true
        }
    }]
}, {
    timestamps: true
})
const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
