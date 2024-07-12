//#region 
var express = require('express');
var router = express.Router();
const Product = require('../models/products');
//#endregion



//#region POST METHOD
router.post('/add', (req, res) => {
    const newProduct = new Product({
        name: req.body.name,
        type: req.body.type,
        price: req.body.price,
        rating: req.body.rating,
        warranty_years: req.body.warranty_years,
        available: req.body.available,
    });

    newProduct.save()
        .then(newProduct => {
            res.json({ result: true, newProduct })
        })
});
//#endregion

//#region GET METHOD
router.get('/getAll', (req, res) => {
    Product.find()
        .then(data => {
            res.json({ result: true, allProducts: data })
        })
})

router.get('/getOne/:id', (req, res) => {
    const id = req.params.id
    Product.findOne({ _id: id })
        .then(data => {
            res.json({ result: true, product: data })
        })
})
//#endregion

//#region PUT METHOD
router.put('/update/:id', (req, res) => {
    const productId = req.params.id;

    const updatedProduct = {
        name: req.body.name,
        type: req.body.type,
        price: req.body.price,
        rating: req.body.rating,
        warranty_years: req.body.warranty_years,
        available: req.body.available
    };

    Product.findOneAndUpdate({ _id: productId }, updatedProduct, { new: true })
        .then(result => {
            if (result) {
                console.log("Updated Product:", result);
                res.json({ result: true, message: "Product updated successfully", updatedProduct: result });
            } else {
                res.json({ result: false, message: "No product found or no changes made" });
            }
        })
        .catch(err => {
            res.json({ result: false, error: err.message });
        });
});

//#endregion


//#region DELETE METHOD
router.delete('/delete/:id',(req,res) => {
    const productId = req.params.id;

    Product.deleteOne({_id : productId})
    .then(() => {
        return Product.find()
    })
    .then(() => {
        res.json({result:true, message: 'Product deleted!'})
    })
})
//#endregion



module.exports = router;
