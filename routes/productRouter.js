const { Router } = require('express')
const Product = require('../models/Product')
const passport = require('passport')
const Jwt = require('jsonwebtoken')
const { reset } = require('nodemon')

const router = Router()

router.post('/product/', async (req, res) => {
    try{
        const body = req.body
        const id = body._id
        const price = body.price
    
        const product = new Product(
            {
                _id: id,
                price: price
            }
        )
    
        await product.save((error, product) => {
            if(error){
                res.status(409).send(error)
                return
            }
            res.send(`Saved ${product.id}`)
        })
    }catch(error){
        res.send(error)
    }
})

router.get('/product/', async (req, res) => {
    const products = await Product.find()
    res.send(products)
})

router.delete('/product/deleteall', async (req, res) => {
    await Product.deleteMany()
    res.send('Ok')
})

router.delete('/product/:id', async (req, res) => {
    await Product.deleteOne({_id: req.params.id})
    res.send(`Deleted ${req.params.id}`)
})
module.exports = router