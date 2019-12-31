const express = require('express');
const product = express.Router();

const guestProductController = require('../../controllers/guest/product');

product.get('/', guestProductController.listProduct)
product.get('/detail', guestProductController.detail)

product.get('/detail/:ID', guestProductController.getById)

module.exports = product;