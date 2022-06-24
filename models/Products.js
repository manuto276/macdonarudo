const mongoose = require('mongoose')

/*
    Nome
    Prezzo
*/

const productSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        type:{
            type: String,
            required: true,
            enum: ['burger', 'pizza', 'salad', 'french-fries', 'drink', 'dessert']
        }
    }
)

module.exports = mongoose.model('Products', productSchema)