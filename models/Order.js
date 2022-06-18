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
            default: Date.now
        },
        totalAmount: {
            type: Int32Array
        }
    }
)