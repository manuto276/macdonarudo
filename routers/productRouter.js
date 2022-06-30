const { Router } = require('express')
const Product = require('../models/Products')
const passport = require('passport')
const Jwt = require('jsonwebtoken')

const router = Router()


// Create a new product (admin only)
router.post('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
    console.log(`${req.method} ${req.originalUrl} from ${req.ip}`);
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


// Edit a product (admin only)
router.put('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    console.log(`${req.method} ${req.originalUrl} from ${req.ip}`);
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


// get all the products in the menu
router.get('/', async (req, res) => {
    console.log(`${req.method} ${req.originalUrl} from ${req.ip}`);
    const products = await Product.find();
    res.send(products);
});


// Delete a specific product (admin only)
router.delete('/:id', passport.authenticate('jwt', {session: false}), async (req, res) => {
    console.log(`${req.method} ${req.originalUrl} from ${req.ip}`);
    if(req.user.role !== 'admin'){
        res.status(401).send();
        return;
    }
    await Product.deleteOne({_id: req.params.id});
    res.send(`Deleted ${req.params.id}`);
});

module.exports = router