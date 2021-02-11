const express = require('express');
const router = express.Router();
const OrderService = require('../services/orders');
const debug = require('debug')('youverify-ecommerce:order-service');

const orderService = new OrderService();

const Customer = require('../lib/models/customer');
const Product = require('../lib/models/product');

/* POST orders create an order. */
router.post('/', async function(req, res) {
  const {customerId, productId} = req.body;

  //This implementation assumes any form of authentication for the customer is out of scope

  if (!customerId || !productId){
    return res.status(400).send({
      status: false,
      message: 'customer_id and product_id are required'
    })
  }


  try {

    if (!await Customer.exists({customerId})){
      return res.status(400).send({
        status: false,
        message: 'customer does not exist'
      })
    }

    if (!await Product.exists({productId})){
      return res.status(400).send({
        status: false,
        message: 'invalid product'
      })
    }


    const response = await orderService.createOrder(customerId, productId);
    res.send(response);
  } catch (e) {
    debug(e);
    res.status(500).send({
      status: false,
      message: 'Unable to process your order'
    })
  }
});

module.exports = router;
