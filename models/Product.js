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
        }
    }
)

module.exports = mongoose.model('Product', productSchema)