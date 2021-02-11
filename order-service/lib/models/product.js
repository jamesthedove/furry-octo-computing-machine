const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    active: Boolean,
});


module.exports =  mongoose.model('products', productSchema);
