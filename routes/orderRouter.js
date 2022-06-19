const { Router } = require('express')
const Order = require('../models/Order')
const passport = require('passport')
const Product = require('../models/Product')
const localStrategyConfig = require('../auth/local-strategy')

const router = Router()

router.post('/order/', passport.authenticate('jwt', {session: false}), async (req, res) => {
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

        const order = new Order({
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

router.put('/order/:orderid', passport.authenticate('jwt', {session: false}), async (req, res) => {
    if(req.user.role !== 'cook'){
        res.status(401).send('Unauthorized')
        return
    }
    try{
        const newStatus = req.body.status
        const oldStatus = await Order.findById(req.params.orderid)
        if(newStatus <= oldStatus){
            res.status(304).send('Status not changed')
            return
        }
        await Order.findByIdAndUpdate(req.params.orderid, {status: newStatus})
    }catch(error){
        res.send(error)
    }
})

router.get('/order/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const orders = await Order.find({clientId: req.user.id})
    res.send(orders)
})

router.delete('/order/deleteall', async (req, res) => {
    await Order.deleteMany()
    res.send('Ok')
})

module.exports = router