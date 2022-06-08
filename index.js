const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const personController = require('./controllers/personController');

async function main() {
    await mongoose.connect('mongodb://localhost:27017/mac_donarudo_db', {useNewUrlParser: true})

    const app = express();

    const port = 3000
    const host = '172.104.250.206'

    // parse application/json
    app.use(bodyParser.json())

    app.get('/',(req,res) => {
        console.log(`GET from ${req.ip}`);
        res.send(`Welcome to Mac Donarudo. Your IP address is ${req.ip}`);
    });

    app.post('/person/create/', personController.createPerson);
    
    app.get('/person/get/', personController.getPersons);

    app.delete('/person/deleteall/',personController.deleteAllPersons);

    app.delete('/person/delete/:username', personController.delete);

    app.listen(port, host, () => {
        console.log(`App listening on ${host}:${port}...`)
    });
}

main();
