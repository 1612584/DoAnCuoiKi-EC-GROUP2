var express = require('express');
var admin = express.Router();

var categories = require('./categories')
var users = require('./user')
var products = require('./products');

admin.get('/', function(req, res, next) {
    res.render('pages/admin/index');
});

admin.use("/categories", categories)
admin.use("/products",products);
admin.use("/users", users)

module.exports = admin;
