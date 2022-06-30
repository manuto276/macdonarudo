#!/usr/bin/env node

const dotenv = require('dotenv');
dotenv.config({path: './.env'});

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const expressSession = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRouter = require('./routers/userRouter');
const orderRouter = require('./routers/orderRouter');
const productRouter = require('./routers/productRouter');
const fs = require('fs');
const Users = require('./models/Users');


async function main() {
    
    console.log(`Connecting to database ...`);
    await mongoose.connect('mongodb://localhost:27017/mac_donarudo_db', {useNewUrlParser: true});
    console.log(`Connection to database successful.`);

    //
    const admin = await Users.findOne({email: 'admin@macdonarudo'});
    if(admin == null){
        const newAdmin = new Users({
            firstName: 'Admin',
            lastName: 'Admin',
            city: 'Admin city',
            bdate: '0033-12-25',
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASS,
            role: 'admin'
        });
        await newAdmin.save((error, admin) => {
            if(error){
                console.log(error);
            }else{
                console.log('CREATED ADMIN USER');
            }
        });
    }
    
    const app = express();

    const port = process.env.PORT
    const host = process.env.HOST
    // http://localhost:3000 from the react debug client,
    // http://localhost:3001 from the express-serverd client
    // http://172.104.250.206:3001 from the server where the app is
    // deployed
    const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'http://172.104.250.206:3001']

    app.use(cors({origin: allowedOrigins, credentials: true}))

    // to parse application/json
    app.use(bodyParser.json())  
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(cookieParser())

    app.use(express.static(path.join(__dirname, '../react/build')));

    app.use(expressSession({resave: false, saveUninitialized: false, secret: process.env.SESSION_SECRET}))
    // initialize passport
    app.use(passport.initialize())
    // initialize passport's sessions
    app.use(passport.session())

    app.use('/api/users/', userRouter);
    app.use('/api/orders/', orderRouter);
    app.use('/api/products/', productRouter);


    // get * must be at the bottom, otherwise every url will be served the website
    app.get('*',(req, res, next) => {
        res.sendFile(path.join(__dirname, process.env.FRONTEND_DIR)); 
    }) 

    app.listen(port, host, () => {
        console.log(`App listening on http://${host}:${port}/ ...`)
    }) 
}

main() 
