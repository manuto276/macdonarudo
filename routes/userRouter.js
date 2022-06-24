const { Router } = require('express')
const Users = require('../models/Users')
const passport = require('passport')
const Jwt = require('jsonwebtoken')
const localStrategyConfig = require('../auth/local-strategy')


const router = Router()

const signToken = (userId) => {
    return Jwt.sign(
        {
            sub: userId, // the payload of the Jwt will contain the userId
        },
        process.env.JWT_SECRET, // secret key
        {expiresIn: '2d'} // expires after 2 days
    )
}

router.post('/', async (req,res) => {
    console.log(req.ip);
    try{
        const body = req.body
        const firstName = body.firstName
        const lastName = body.lastName
        const city = body.city;

        // the role will be later be impossible to set,
        // since it will be manually set by the admin
        const role = body.role
        const email = body.email
        const password = body.password
        const bdate = body.bdate
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
                    if(error.errors.email.message === 'email_used'){
                        res.status(400).send('email_used');
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

router.get('/', async (req,res) => {
    console.log(`GET from ${req.ip}`);
    const users = await Users.find();
    res.send(users);
})

router.delete('/deleteall/', passport.authenticate('jwt', {session: false}), async (req,res) => {
    await Users.deleteMany();
    res.send('Ok');
})

router.delete('/:email/', passport.authenticate('jwt', {session: false}), async (req,res) => {
  try{
        const email = req.params.email;
        await Users.deleteOne({email: email});
        res.send(`Deleted ${email}`);
  }catch(error){
        res.send(error)
  }
}) 

router.post('/login/', passport.authenticate('local', {session: false}),
    (req, res) => {
        console.log(`POST from ${req.ip}`);
        const { _id, email, role } = req.user
        const token = signToken(_id)
        res.cookie('access_token', token, {httpOnly: true})
        const user = {
            role: req.user.role
        }
        res.status(200).send(user)
        return
    }
)

router.get('/logout/', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.clearCookie('access_token')
    res.send('Bye')
})

router.get('/authenticated/', passport.authenticate('jwt', {session: false}), async (req ,res) => {
    console.log(`GET from ${req.ip}`);
    console.log(req.user);
    const user = {
        role: req.user.role
    }
    res.status(200).send(user)
});

router.put('/changerole/', passport.authenticate('jwt', {session: false}), async (req, res) => {
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