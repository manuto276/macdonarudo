const express = require('express');
const app = express();

const port = 3000
const host = 'localhost'

app.get('/',(req,res) => {
    console.log(`GET from ${req.ip}`);
    res.send('Welcome to Mac Donarudo');
});

app.listen(port, host, () => {
    console.log(`App listening on ${host}:${port}...`)
});