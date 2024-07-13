//#region imports
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const http = require('http');
const {Server} = require('socket.io');
const Product = require('../models/products');
const { verifyToken } = require('../modules/tools/verifyToken')
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    }
});

mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });


app.use(cors())

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
    socket.on('example', (data) => {
        console.log('Received data:', data);
    });
});
//#endregion



//#region POST METHOD
router.post('/add', verifyToken, (req, res) => {

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
            res.json({ result: true, newProduct });
            io.emit('productAdded', newProduct);
        })
        .catch(err => {
            console.error('Error saving product:', err);
            res.status(500).json({ result: false, error: 'Failed to save product' });
        });
});
//#endregion

//#region GET METHOD
router.get('/all', (req, res) => {
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
router.put('/update/:id', verifyToken, (req, res) => {
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
                io.emit('productUpdated', result);
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
router.delete('/delete/:id', verifyToken, (req, res) => {
    const productId = req.params.id;

    Product.findByIdAndDelete(productId)
        .then(deletedProduct => {
            if (!deletedProduct) {
                throw new Error('Product not found');
            }
            console.log("Deleted Product:", deletedProduct);
            res.json({ result: true, message: 'Product deleted!' });
            io.emit('productDeleted', deletedProduct);
        })
        .catch(err => {
            console.error('Error deleting product:', err);
            res.status(500).json({ result: false, error: 'Failed to delete product' });
        });
});
//#endregion

//#region socket

const PORT =  process.env.PORT;
server.listen(3002, () => {
    console.log('Server on port 3002');
});
//#endregion



module.exports = router;