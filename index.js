#!/usr/bin/env node

const dotenv = require('dotenv');
dotenv.config({path: './.env'});

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const expressSession = require('express-session');
const passport = require('passport');
const expressFlash = require('express-flash');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const orderRouter = require('./routes/orderRouter');
const productRouter = require('./routes/productRouter');
const fs = require('fs');
const User = require('./models/Users');
const { json } = require('express');
const Products = require('./models/Products');


// this function is from passport-config.js

async function main() {
    
    console.log(`Connecting to database ...`);
    await mongoose.connect('mongodb://localhost:27017/mac_donarudo_db', {useNewUrlParser: true})
    console.log(`Connection to database successful.`);

    //
    if(!(fs.existsSync('first_run/first_run_check.txt'))){
        console.log("First run, creating admin user...");
        fs.writeFileSync('first_run/first_run_check.txt', 'Just a random file to know if this is the first time running the app.',
        (error) => {if(error){console.log(error);}});
        const adminCredentials = JSON.parse(fs.readFileSync('first_run/admin.json', 'utf-8'));
        const admin = User({
            email: adminCredentials.email,
            password: adminCredentials.password,
            firstName: 'Admin',
            lastName: 'Admin',
            bdate: new Date('2000-07-31'),
            city: 'Admin city',
            role: 'admin'
        });
        await admin.save((error, admin) => {
            if(error){
                console.log(error);
            }
        });

        const menu = JSON.parse(fs.readFileSync('first_run/menu.json'));
        for(productObj in menu){
            const product = new Products(productObj)
            await product.save((error, product) => {
                console.log(error);
            });
        }
        console.log("DONE");
    }

    const app = express() 

    const port = 3001
    const host = 'localhost'
    // http://localhost:3000 from the react debug client,
    // http://localhost:3001 from the express-serverd client
    const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'http://172.104.250.206:3001']

    app.use(cors({origin: allowedOrigins, credentials: true}))

    // to parse application/json
    app.use(bodyParser.json())  
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(cookieParser())

    app.use(express.static(path.join(__dirname, '../react/build')));

    app.use(expressSession({resave: false, saveUninitialized: false, secret: process.env.SESSION_SECRET}))
    app.use(expressFlash())
    // initialize passport
    app.use(passport.initialize())
    // initialize passport's sessions
    app.use(passport.session())

    app.use('/api/users/', userRouter)
    app.use('/api/orders/', orderRouter)
    app.use('/api/products/', productRouter)

    // get * must be at the bottom, otherwise every url will be served the website
    app.get('*',(req, res, next) => {
        console.log(`GET from ${req.ip}`) 
        res.sendFile(path.join(__dirname, '../react/build/')); 
    }) 

    app.listen(port, host, () => {
        console.log(`App listening on http://${host}:${port}/ ...`)
    }) 
}

main() 
