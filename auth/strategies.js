const LocalStrategy = require('passport-local').Strategy
const passport = require('passport')
const Users = require('../models/Users')
const JwtStrategy = require('passport-jwt').Strategy

// function to extract access_token cookie from the incoming request
const getCookie = (req) => {
    let token = null
    if(req && req.cookies){
        token = req.cookies['access_token']
    }
    return token
}

// this strategy is used if the user already has an access_token cookie, for auth reasonss
passport.use(new JwtStrategy(
    {
        jwtFromRequest: getCookie,
        secretOrKey: process.env.JWT_SECRET,
    },
    // this callback verifies if the JWT contains the correct credentials
    // the payload is the data content of the JWT
    async (payload, done) => {
        Users.findById(payload.sub, (error, user) => {
            if(error){
                return done(error, false)
            }
            if(user){
                return done(null, user)
            }
            return done(null, false)
        })
    }
))

// this strategy is the user is logging in without a previous access_token cookie.
passport.use(new LocalStrategy(
    // specify that the username is in fact the email and the password is just password in the
    // incoming json
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    // callback to check if the login data is correct and autenticate
    async (email, password, done) => {
        Users.findOne({email: email}, (error, user) => {
            if(error){
                return done(error, false)
            }
            if(user){
                // this function is in Users.js
                // if the password is correct it will return done(null, user)
                return user.verifyPassword(password, done)
            }
            return done(null, false)
        })
    }

))