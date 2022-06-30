const mongoose = require('mongoose')
const Product = require('./Products')
const Users = require('./Users')

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
            type: Date,
            required: true
        },
        totalAmount: {
            type: Number,
            required: true
        },
        userId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'Users'
        },
        status: {
            type: String,
            // sent, preparation, ready, canceled
            enum: ['pending', 'accepted', 'completed', 'rejected'],
            required: true
        },
        products: [{
            type: {
                _id: {
                    type: mongoose.Types.ObjectId,
                    required: true,
                    ref: 'Products'
                },
                name: {
                    type: String,
                    required: true
                },
                amount: {
                    type: Number,
                    required: true
                }
            },
            required: true
        }]
    }
)

module.exports = mongoose.model('Orders', orderSchema)