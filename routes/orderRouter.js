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
    const productIds = body.productIds

    const order = new Order({
            totalAmount: totalAmount, 
            clientId: clientId,
            productIds: productIds
        })
    await order.save
})