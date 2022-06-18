const mongoose = require('mongoose')

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
            required: true,
            default: Date.now()
        },
        totalAmount: {
            type: Number
        },
        clientId: {
            type: mongoose.Types.ObjectId,
            required: true,
        },
        products: [{
            type: {productId: {
                type: String, // it will be ObjectId
                required: true
            }, amount: {
                type: Number,
                required: true
            }},
            required: true
        }]
    }
)

module.exports = mongoose.model('Order', orderSchema)