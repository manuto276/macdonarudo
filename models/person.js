const mongoose = require('mongoose')

/*
    ID
	Dati autenticazione passport.js
	Data di nascita
	Ruolo
	Array ID ordini (se sei cuoco sono gli ordini presi in carico, se sei cliente sono gli ordini effettuati, se sei admin null)
*/

const schema = new mongoose.Schema(
    {
        name: String,
        bdate: Date,
        role: String,
        order_ids: [mongoose.Types.ObjectId],
        username: String,
        password: String
    }
)

module.exports = mongoose.model('Person',this.schema)