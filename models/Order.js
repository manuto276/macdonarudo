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
        productIds: {
            type: {productId: mongoose.Types.ObjectId, amount: Number},
            required: true
        }
    }
)

module.exports = mongoose.model('Order', orderSchema)