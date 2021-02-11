const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderStatus: {
        type: String,
        enum : ['pending','fulfilled', 'unfulfilled'],
        default: 'pending',
    },
    productId: {String},
    customerId: String,
    amount: Number,
});


module.exports =  mongoose.model('orders', orderSchema);
