const { Router } = require('express')
const Product = require('../models/Products')
const passport = require('passport')
const Jwt = require('jsonwebtoken')
const { reset } = require('nodemon')

const router = Router()

router.post('/', async (req, res) => {
    try{
        const body = req.body;
        const id = body._id;
        const price = body.price;
        const type = body.type;
    
        const product = new Product(
            {
                _id: id,
                price: price,
                type: type
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
        res.status(400).send(error)
    }
})

router.get('/', async (req, res) => {
    const products = await Product.find()
    res.send(products)
})

router.delete('/deleteall', async (req, res) => {
    await Product.deleteMany()
    res.send('Ok')
})

router.delete('/:id', async (req, res) => {
    await Product.deleteOne({_id: req.params.id})
    res.send(`Deleted ${req.params.id}`)
})
module.exports = router