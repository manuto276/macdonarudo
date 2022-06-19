const mongoose = require('mongoose')
const Product = require('../models/Product')

/*
    ID
    Data
    Prezzo tot
    Array prodotti
    _idCliente
*/

const orderSchema = new mongoose.Schema(
    {
        date: {
            type: String,
            required: true
        },
        totalAmount: {
            type: Number,
            required: true
        },
        clientId: {
            type: mongoose.Types.ObjectId,
            required: true,
        },
        products: [{
            type: {
                _id: {
                    type: String,
                    required: true,
                    ref: Product
                }, 
                amount: {
                    type: Number,
                    required: true
                },
                discountCode: {
                    type: String,
                    required: false
                }
            },
            required: true
        }]
    }
)

module.exports = mongoose.model('Order', orderSchema)