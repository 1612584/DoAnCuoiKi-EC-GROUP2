var express = require('express');
var categories = express.Router();
const manager = require('../../controllers/admin/categories/manager')

categories.get('/', function (req, res, next) {
    res.render('pages/admin/categories');
});

categories.post("/create", manager.create)
categories.get("/read", manager.read)
categories.post("/delete", manager.detete)
categories.post("/update", manager.update)

module.exports = categories;