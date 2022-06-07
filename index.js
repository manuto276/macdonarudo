const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

async function main() {
    await mongoose.connect('mongodb://localhost:27017/mac_donarudo_db', {useNewUrlParser: true})

    const app = express();

    const port = 3000
    const host = 'localhost'

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }))

    // parse application/json
    app.use(bodyParser.json())

    app.get('/',(req,res) => {
        console.log(`GET from ${req.ip}`);
        res.send(`Welcome to Mac Donarudo.`);
    });

    app.post('/person/create/', (req,res) => {
        console.log(req.body);
        res.send(req.body)
    })

    app.listen(port, host, () => {
        console.log(`App listening on ${host}:${port}...`)
    });
}

main();
