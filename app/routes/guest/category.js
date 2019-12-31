const express = require('express');
const category = express.Router();

const guestCategoryController = require('../../controllers/guest/category/category');

category.get('/', guestCategoryController.category)

module.exports = category;