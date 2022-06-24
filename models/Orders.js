const mongoose = require('mongoose')
const Product = require('./Products')
const User = require('./Users')

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
            ref: 'User'
        },
        status: {
            type: Number,
            // sent, preparation, ready, canceled
            enum: [0, 1, 2, 3],
            required: true
        },
        products: [{
            type: {
                _id: {
                    type: String,
                    required: true,
                    ref: 'Products'
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

module.exports = mongoose.model('Orders', orderSchema)