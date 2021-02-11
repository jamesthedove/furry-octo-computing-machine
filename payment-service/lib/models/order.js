const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderStatus: {
        type: String,
        enum : ['pending','fulfilled', 'unfulfilled'],
        default: 'pending',
    },
    productId: {
        type: mongoose.Types.ObjectId,
        ref: "products",
        required: true,
    },
    customerId: {
        type: mongoose.Types.ObjectId,
        ref: "customers",
        required: true,
    },
    amount: Number,
});


module.exports =  mongoose.model('orders', orderSchema);
