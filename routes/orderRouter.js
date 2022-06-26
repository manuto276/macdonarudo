const { Router } = require('express')
const Orders = require('../models/Orders')
const passport = require('passport')
const Product = require('../models/Products')
const Users = require('../models/Users')
const StrategyConfig = require('../auth/strategies.js')
const Products = require('../models/Products')

const router = Router()

router.post('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try{
        const userId = req.user.id
        const productsObjs = req.user.cart;

        let products = [];
        let valid = true;
        // check if products exists and if they do add the retrieved data to array and use it
        // to calculate the total amount
        for(i=0; i<productsObjs.length; i++){
            const product = await Product.findById(productsObjs[i]._id)
            if(product === null){
                valid = false
                break
            }
            products.push(product)
        }

        if(!valid){
            res.status(409).send(`Invalid product(s)`)
            return
        }

        let totalAmount = 0
        for(i=0; i<products.length; i++){
            totalAmount += products[i].price * productsObjs[i].amount
        }

        const order = new Orders({
                totalAmount: totalAmount, 
                clientId: userId,
                products: productsObjs,
                date: Date.now(),
                status: 0
            })

        await order.save(async (error, order) => {
            if(error){
                res.status(409).send(error)
            }else{
                req.user.cart = [];
                await req.user.save(async (error, user) => {
                    if(error){
                        res.status(502).send(error);
                        return;
                    }
                    res.send(`Saved order ${order.id} for ${order.totalAmount}`);
                });
            }
        })
    }catch(error){
        res.send(error)
    }
})

router.put('/:orderid/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    if(req.user.role !== 'cook'){
        res.status(401).send('Unauthorized')
        return
    }
    try{
        const newStatus = req.body.status
        const oldStatus = await Orders.findById(req.params.orderid)
        if(newStatus <= oldStatus){
            res.status(304).send('Status not changed')
            return
        }
        await Orders.findByIdAndUpdate(req.params.orderid, {status: newStatus})
    }catch(error){
        res.send(error)
    }
})

router.get('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const orders = await Orders.find({clientId: req.user.id})
    res.send(orders)
})

router.delete('/deleteall/', async (req, res) => {
    await Orders.deleteMany()
    res.send('Ok')
})


router.post('/cart/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try{
        const products = req.body;
        const userObj = req.user;
        for(i=0; i<products.length; i++){
            const product = products[i];
            const productId = product._id;
            console.log(productId);
            let isProductInMenu = await Products.findById(productId);
            if(!isProductInMenu){
                res.status(400).send('Bad product id');
                return;
            }
            const amount = product.amount;
            const user = await Users.findById(userObj._id);
            let exists = false
            for(j=0; j<user.cart.length; j++){
                if(user.cart[j]._id === productId){
                    user.cart[j].amount += amount;
                    exists = true;
                    break;
                }
            }
            if(!exists){
                user.cart.push({_id: productId, amount: amount});
            }
            await user.save((error, user) => {
                if(error){
                    console.log(error);
                }
            });
        }
        res.status(200).send(`Added: \n${products}`);
    }catch(error){
        console.log(error);
        res.status(400).send(error);
    }
});

router.get('/cart/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try{
        const id = req.user._id;
        const role = req.user.role;
        if(role === 'cook'){
            res.status(401).send("Cooks can't have a cart");
        }
        const user = await Users.findById(req.user._id);
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

router.delete('/cart/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try{
        const productId = req.params.id;
        const user = req.user;
        console.log(productId);
        user.cart = user.cart.filter(product => {
            console.log(product._id);
            return product._id !== productId;
        });
        let status = 200;
        let error = null;
        await user.save((err, user) => {
            if(err){
                status = 502;
                console.log(err);
                error = error;
            }
        });
        res.status(status).send(error)
    }catch(error){
        console.log(error);
        res.status(400).send(error);
    }
});

/*router.get('/status/', passport.authenticate('jwt', {session: false}), async function(req, res) {
    res.header({
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive'
    });
    res.flushHeaders();

    res.write('retry: 5000\n\n');
    const userId = req.user._id;
    let userOrders = await Orders.find({clientId: userId, status: {$ne: 3}}, {_id: 1, status: 1});
    while (true) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        let newUserOrders = await Orders.find({clientId: userId, status: {$ne: 3}}, {_id: 1, status: 1});
        if()
    }
  });*/


module.exports = router