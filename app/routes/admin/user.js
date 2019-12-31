var express = require('express');
var user = express.Router();
const adminUserController = require('../../controllers/admin/users')

// render ejs
user.get('/manageUser', adminUserController.getUsers)
user.get('/user_role', adminUserController.getUserRole)

// return json
user.get('/api/delete_user?:id', adminUserController.apiDeleteUser)
user.get('/api/get_user?:id', adminUserController.apiGetUser)
user.post('/api/update_user?:id', adminUserController.apiUpdateUser)
user.get('/api/upgrage_bidder/:id', adminUserController.apiUpgradeBidder)
user.get('/api/back_bidder/:id', adminUserController.apiBackBidder)
user.get('/api/upgrage_bidder_all', adminUserController.apiUpgradeBidderAll)
user.get('/api/back_bidder_all', adminUserController.apiBackBidderAll)

module.exports = user;