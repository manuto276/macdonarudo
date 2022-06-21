const { Router } = require('express')
const User = require('../models/User')
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

router.post('/user/', async (req,res) => {
    console.log(req.ip);
    try{
        const body = req.body
        const name = body.name

        // the role will be later be impossible to set,
        // since it will be manually set by the admin
        const role = body.role
        const email = body.email
        const password = body.password
        const bdate = body.bdate
        const user = new User({
            name: name,
            role: role,
            email: email,
            password: password,
            bdate: new Date(bdate.toString())
        })
     
        // save model to database
        await user.save((error, user) => {
            if (error){
                res.send(error);
          }
        });
    }catch(error){
        res.send(error)
    }
}) 

router.get('/user/', async (req,res) => {
    const users = await User.find();
    res.send(users);
})

router.delete('/user/deleteall/', passport.authenticate('jwt', {session: false}), async (req,res) => {
    await User.deleteMany();
    res.send('Ok');
})

router.delete('/user/:username/', passport.authenticate('jwt', {session: false}), async (req,res) => {
  try{
        const email = req.params.email;
        await User.deleteOne({_id: email});
        res.send(`Deleted ${email}`);
  }catch(error){
        res.send(error)
  }
}) 

router.post('/user/login/', passport.authenticate('local', {session: false}),
    (req, res) => {
        const { _id, email, role } = req.user
        const token = signToken(_id)
        res.cookie('access_token', token, {httpOnly: true, sameSite: true})
        res.status(200).send(`${email} is autenticated`)
        return
    }
)

router.get('/user/logout/', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.clearCookie('access_token')
    res.send('Bye')
})

router.get('/user/authenticated/', passport.authenticate('jwt', {session: false}), async (req ,res) => {
    res.status(200).send(`${req.user.email} is authenticated`)
})

router.post('/user/authenticated/', passport.authenticate('jwt', {session: false}),
    (req, res) => {
        res.status(200).send(`${req.user.email}'s sessions is valid`)
    }
)

module.exports = router