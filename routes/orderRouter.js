const { Router } = require('express')
const Orders = require('../models/Orders')
const passport = require('passport')
const Product = require('../models/Products')
const Users = require('../models/Users')
const StrategyConfig = require('../auth/strategies.js')
const Products = require('../models/Products')
const router = Router()

let sseConnections = [];

router.post('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try{
        const userId = req.user.id
        let products = req.user.cart;
        if(products.length === 0){
            res.status(400).send('Empty cart');
            return;
        }
        let productsFromMenu = [];
        // check if products exists and if they do add the retrieved data to array and use it
        // to calculate the total amount
        let totalAmount = 0
        let productsWithNames = [];
        for(i=0; i<products.length; i++){
            let product = products[i];
            const productId = product._id;
            let productFromMenu = await Products.findById(productId);
            if(productFromMenu != null){
                productsFromMenu.push(productFromMenu);
                // set product original name in order!
                productsWithNames.push({
                    _id: products[i]._id,
                    amount: products[i].amount,
                    name: productFromMenu.name
                });
                totalAmount += productsFromMenu[i].price * products[i].amount
            }else{
                products.splice(i, 1);
            }
        }
        const order = new Orders({
                totalAmount: totalAmount, 
                userId: userId,
                products: productsWithNames,
                date: Date.now(),
                status: 'pending'
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
        if(newStatus === 'rejected' && oldStatus === 'completed'){
            res.status(400).send(`Can't reject completed order.`);
            return;
        }
        await Orders.findByIdAndUpdate(req.params.orderid, {status: newStatus})
        
        for(const connection in sseConnections){
            if(connection.userId === req.user._id){
                connection.updates.push({orderId: req.params.orderid, status: newStatus, read: false});
                connection.updates = connection.updates.filter((update, i) => {
                    return update.read === false;
                });
            }
        }
        res.status(200).send('Ok')
        
    }catch(error){
        res.send(error)
    }
})

router.get('/updates/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    res.set({
        'Cache-Control': 'no-cache',
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive'
      });
    console.log('Set SSE.');
        
    const sseConnection = {userId: req.user._id, updates: []}
    sseConnections.push(sseConnection);

    const interval = setInterval(() => {
        const updatesToSend = [];
        for(const update in sseConnection.updates){
            update.read = true;
            updatesToSend.push({orderId: update.orderId, status: update.status});
        }
        if(updatesToSend.length > 0){
            res.write(`data: ${updatesToSend}\n\n`);
        }
    }, 1000)
    
    res.on('close', () => {
        clearInterval(interval);
        sseConnections.splice(sseConnections.indexOf(sseConnection), 1);
    })

});

router.get('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try{
        if(req.user.role === 'cook'){
            const orders = await Orders.find({$and: [{status: {$not: {$eq: 'completed'}}}, {status: {$not: {$eq: 'rejected'}}}]})
            .sort({date: 'desc'});
            res.setHeader('Cache-Control', 'no-store').send(orders);
        }else if(req.user.role === 'admin'){
            const orders = await Orders.find().sort({date: 'desc'});
            res.setHeader('Cache-Control', 'no-store').send(orders);
        }else{
            const orders = await Orders.find({userId: req.user._id}).sort({date: 'desc'});
            res.setHeader('Cache-Control', 'no-store').send(orders);
        }
    }catch(error){
        res.status(400).send(error);
    }
})

router.delete('/deleteall/', async (req, res) => {
    await Orders.deleteMany();
    res.send('Ok');
})


router.post('/cart/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try{
        console.log(req.body);
        const products = req.body;
        if(products.length === 0){
            res.status(400).send('Empty products');
            return;
        }
        const userObj = req.user;
        for(i=0; i<products.length; i++){
            const product = products[i];
            const productId = product._id;
            let isProductInMenu = await Products.findById(productId);
            if(isProductInMenu == null){
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
    let wasCartModified = false;
    let user = req.user;
    try{
        const id = req.user._id;
        const role = req.user.role;
        if(role === 'cook' || role === 'admin'){
            res.status(401).send("Cooks can't have a cart");
            return;
        }
        let cart = req.user.cart;
        console.log(req.user.cart);
        
        for(let i=0; i<cart.length; i++){
            let product = cart[i];
            const productFromMenu = await Products.findById(product._id);
            if(productFromMenu == null){
                console.log('slicing');
                // remove non-existing product from cart
                user.cart.splice(i,1);
                wasCartModified = true;
                console.log(user.cart);
            }
        }
        if(cart){
            res.status(200).send(cart);
        }else{
            res.status(404).send('no_cart');
        }
    }catch(error){
        res.setHeader('Cache-Control', 'no-store').status(400).send(error);
    }
    if(wasCartModified){
        await user.save((error, user) => {

        });
    }
});

router.delete('/cart/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try{
        const productId = req.params.id;
        const user = req.user;
        user.cart = user.cart.filter(product => {
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