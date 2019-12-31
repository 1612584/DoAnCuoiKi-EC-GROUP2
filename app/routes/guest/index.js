const express = require('express');
const guest = express.Router();

const guestLoginRegisterController = require('../../controllers/guest/login_register');
const guestController = require('../../controllers/guest');
const productRouter = require('./product');
const categoryRouter = require('./category');


guest.get('/login', guestLoginRegisterController.login);
guest.post('/login', guestLoginRegisterController.loginPost);
guest.get('/register', guestLoginRegisterController.register);
guest.post('/register', guestLoginRegisterController.registerPost);
guest.get('/', guestController.getHome);

guest.use('/product', productRouter);
guest.use('/category', categoryRouter);

module.exports = guest;