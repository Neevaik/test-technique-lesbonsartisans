const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: String,
    type:String,
    price:Number,
    rating:Number,
    warranty_years:Number,
    available:Boolean
});

const Product = mongoose.model('products', productSchema);

module.exports = Product;