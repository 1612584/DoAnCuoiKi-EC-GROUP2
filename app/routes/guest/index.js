const express = require('express');
const guest = express.Router();

const guestLoginRegisterController = require('../../controllers/guest/authentication');
const guestController = require('../../controllers/guest');
const productRouter = require('./product');
const categoryRouter = require('./category');
const auth = require('../../middleware/auth');


guest.get('/login', guestLoginRegisterController.login);
guest.post('/login', guestLoginRegisterController.loginPost);
guest.get('/register', guestLoginRegisterController.register);
guest.post('/register', guestLoginRegisterController.registerPost);
guest.get('/logout', auth, guestController.logOut);
guest.get('/', guestController.getHome);



guest.use('/products', productRouter);
guest.use('/category', categoryRouter);

module.exports = guest;