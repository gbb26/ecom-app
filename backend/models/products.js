const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: false
    },
    inStock: {
        type: Number,
        required: true
    },
    prodImage: {
        type: String,
        required: true
    },
    rating: {
        rate: {
            type: Number
        },
        count: {
            type: Number
        }
    }
})
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
