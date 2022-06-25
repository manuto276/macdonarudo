const { Router } = require('express')
const Product = require('../models/Products')
const passport = require('passport')
const Jwt = require('jsonwebtoken')

const router = Router()

router.post('/', async (req, res) => {
    try{
        const body = req.body;
        const name = body.name;
        const price = body.price;
        const type = body.type;
        const image = body.image;

        console.log(image);
    
        const product = new Product(
            {
                name: name,
                price: price,
                type: type,
                image: image
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
        console.log(error);
        res.status(400).send(error)
    }
})

router.get('/', async (req, res) => {
    const products = await Product.find();
    res.send(products);
});

router.delete('/deleteall', async (req, res) => {
    await Product.deleteMany()
    res.send('Ok')
})

router.delete('/:id', async (req, res) => {
    await Product.deleteOne({_id: req.params.id})
    res.send(`Deleted ${req.params.id}`)
})
module.exports = router