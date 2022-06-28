const { Router } = require('express')
const Product = require('../models/Products')
const passport = require('passport')
const Jwt = require('jsonwebtoken')

const router = Router()

router.post('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try{
        if(req.user.role !== 'admin'){
            res.status(401).send();
            return;
        }
        const body = req.body;
        const name = body.name;
        const price = body.price;
        const type = body.type;
        const image = body.image;
    
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
});

router.put('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try{
        if(req.user.role !== 'admin'){
            res.status(401).send();
            return;
        }
        const id = req.params.id;
        const body = req.body;
        const name = body.name;
        const price = body.price;
        const type = body.type;
        const image = body.image;
    
        const newValues = {
                name: name,
                price: price,
                type: type,
                image: image
            }
    
        await Product.findByIdAndUpdate(req.params.id, newValues);
        res.status(200).send();


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

router.delete('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    if(req.user.role !== 'admin'){
        res.status(401).send();
        return;
    }
    await Product.deleteOne({_id: req.params.id});
    res.send(`Deleted ${req.params.id}`);
});

module.exports = router