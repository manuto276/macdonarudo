const { Router } = require('express')
const Order = require('../models/Order')
const passport = require('passport')
const Jwt = require('jsonwebtoken')
const localStrategyConfig = require('../auth/local-strategy')

const router = Router()

router.post('/order/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const body = req.body
    const totalAmount = body.totalAmount
    const clientId = req.user.id
    const products = body.products

    const order = new Order({
            totalAmount: totalAmount, 
            clientId: clientId,
            products: products
        })

    await order.save((error, order) => {
        if(error){
            res.send(error)
        }else{
            res.send(`Saved order ${order.id}`)
        }
    })
})

router.get('/order/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    const orders = await Order.find({clientId: req.user.id})
    res.send(orders)
})

module.exports = router