const { Router } = require('express')
const Users = require('../models/Users')
const passport = require('passport')
const Jwt = require('jsonwebtoken')
const localStrategyConfig = require('../auth/strategies')


const router = Router()


// Create a user. For testing purposes, a user can decide to register as a cook.
// The admin user can only be created automatically by the server
router.post('/', async (req,res) => {
    console.log(`${req.method} ${req.originalUrl} from ${req.ip}`);
    try{
        const body = req.body
        const firstName = body.firstName
        const lastName = body.lastName
        const city = body.city;

        const role = body.role
        const email = body.email
        const password = body.password
        const bdate = body.bdate
        if(role === 'admin'){
            res.status(401).send("Can't manually create admins.");
        }
        const user = new Users({
            firstName: firstName,
            lastName: lastName,
            role: role,
            email: email,
            city: city,
            password: password,
            bdate: new Date(bdate.toString())
        })
     
        // save model to database
        await user.save((error, user) => {
            if (error){
                try{
                    if(error.errors.email != undefined
                        && error.errors.email.message === 'email_used'){
                        res.status(400).send('email_used');
                        return;
                    }else if(error.errors.bdate != undefined && error.errors.bdate.message === 'underage'){
                        res.status(400).send('underage');
                        return;
                    }
                }catch(error){
                    console.log(error);
                    res.status(502).send(error);
                    return;
                }
                res.status(400).send(error);
                return;
          }
          res.status(200).send('User created');
        });
    }catch(error){
        res.status(400).send(error);
    }
}) 


// Sign the access token that will be sent to the user
const signToken = (userId) => {
    return Jwt.sign(
        {
            sub: userId, // the payload of the Jwt will contain the userId
        },
        process.env.JWT_SECRET, // secret key
        {expiresIn: '2d'} // expires after 2 days
    )
}


// Login
router.post('/login/', passport.authenticate('local', {session: false}),
    (req, res) => {
        console.log(`${req.method} ${req.originalUrl} from ${req.ip}`);
        const { _id, email, role } = req.user
        const token = signToken(_id)
        res.cookie('access_token', token, {httpOnly: true, sameSite: 'strict'})
        const user = {
            role: req.user.role
        }
        res.status(200).send(user)
        return
    }
)


// Logout
router.get('/logout/', passport.authenticate('jwt', {session: false}), (req, res) => {
    console.log(`${req.method} ${req.originalUrl} from ${req.ip}`);
    res.clearCookie('access_token')
    res.send('Bye')
})


// Check if the current user is authenticated, and get their role
router.get('/authenticated/', passport.authenticate('jwt', {session: false}), async (req ,res) => {
    console.log(`${req.method} ${req.originalUrl} from ${req.ip}`);
    const user = {
        role: req.user.role
    }
    res.status(200).send(user)
});


// not implemented in GUI, can still be used by ad admin user
router.put('/changerole/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    console.log(`${req.method} ${req.originalUrl} from ${req.ip}`);
    try{
        if(req.user.role !== 'admin'){
            res.status(401).send('Admin privileges required');
            return;
        }
        const email = req.body.email;
        const newRole = req.body.newRole;
        roles = ['customer', 'cook', 'admin'];
        if(!(roles.some((role) => role === newRole))){
            res.status(400).send('Invalid role.');
            return;
        }
        
        const user = await Users.findOneAndUpdate({email: email}, {role: newRole});
        
        res.status(200).send('Updated role.')
    }catch(error){
        console.log(error);
        res.status(400).send(error);
    }
});

module.exports = router