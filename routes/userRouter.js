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
        const firstName = body.firstName
        const lastName = body.lastName
        const city = body.city;

        // the role will be later be impossible to set,
        // since it will be manually set by the admin
        const role = body.role
        const email = body.email
        const password = body.password
        const bdate = body.bdate
        const user = new User({
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

router.get('/user/', async (req,res) => {
    console.log(`GET from ${req.ip}`);
    const users = await User.find();
    res.send(users);
})

router.delete('/user/deleteall/', passport.authenticate('jwt', {session: false}), async (req,res) => {
    await User.deleteMany();
    res.send('Ok');
})

router.delete('/user/:email/', passport.authenticate('jwt', {session: false}), async (req,res) => {
  try{
        const email = req.params.email;
        await User.deleteOne({email: email});
        res.send(`Deleted ${email}`);
  }catch(error){
        res.send(error)
  }
}) 

router.post('/user/login/', passport.authenticate('local', {session: false}),
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

router.get('/user/logout/', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.clearCookie('access_token')
    res.send('Bye')
})

router.get('/user/authenticated/', passport.authenticate('jwt', {session: false}), async (req ,res) => {
    console.log(`GET from ${req.ip}`);
    console.log(req.user);
    const user = {
        role: req.user.role
    }
    res.status(200).send(user)
})

router.post('/order/cart/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try{
        const products = req.body.products;
        const userObj = req.user;
        for(i=0; i<products.length; i++){
            const product = products[i];
            const productId = product._id;
            const amount = product.amount;
            const user = await User.findById(userObj._id);
            user.cart.push({_id: productId, amount: amount})
            await user.save((error, user) => {
                if(error){
                    res.status(502).send(error);
                }else{
                    res.status(200).send(`Added ${products.length} elements`);
                }
            });
        }
    }catch(error){
        res.status(400).send(error);
    }
});

router.get('/order/cart/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try{
        const id = req.user._id;
        const role = req.user.role;
        if(role === 'cook'){
            res.status(401).send("Cooks can't have a cart");
        }
        const user = await User.findById(req.user._id);
        const cart = user.cart;
        if(cart){
            res.status(200).send(cart);
        }else{
            res.status(404).send('no_cart');
        }
    }catch(error){
        res.status(400).send(error);
    }
});

module.exports = router