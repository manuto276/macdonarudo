const { Router } = require('express')
const Orders = require('../models/Orders')
const passport = require('passport')
const Product = require('../models/Products')
const localStrategyConfig = require('../auth/local-strategy')

const router = Router()

router.post('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try{
        const body = req.body
        const clientId = req.user.id
        const productsObjs = body.products

        let products = []
        let valid = true
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
                clientId: clientId,
                products: productsObjs,
                date: Date.now(),
                status: 0
            })

        await order.save((error, order) => {
            if(error){
                res.status(409).send(error)
            }else{
                res.send(`Saved order ${order.id} for ${order.totalAmount}`)
            }
        })
    }catch(error){
        res.send(error)
    }
})

router.put('/:orderid', passport.authenticate('jwt', {session: false}), async (req, res) => {
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

router.get('/orders/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const orders = await Orders.find({clientId: req.user.id})
    res.send(orders)
})

router.delete('/deleteall', async (req, res) => {
    await Orders.deleteMany()
    res.send('Ok')
})


router.post('/cart/', passport.authenticate('jwt', {session: false}), async (req, res) => {
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

router.get('/orders/cart/', passport.authenticate('jwt', {session: false}), async (req, res) => {
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