const express = require('express');
const product = express.Router();

const guestProductController = require('../../controllers/guest/product');

product.get('/', guestProductController.listProduct)
product.get('/update_time', guestProductController.updateTime)

product.get('/detail/:ID', guestProductController.getById)

module.exports = product;