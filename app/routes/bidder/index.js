var express = require('express');
var router = express.Router();

const bidderController = require('../../controllers/bidder')
const profileRouter = require('./profile');

const auth = require('../../middleware/auth')
const bidder = require('../../middleware/bidder')


router.get('/api/add_to_favorite/:idProduct', auth, bidder, bidderController.apiAddToFavorite)
router.get('/api/favorite_product', bidderController.apiGetListFavorite)
router.get('/api/bid/:id', bidderController.apiBid)
router.get('/api/bidders/:id', bidderController.apiGetBidders)
router.get('/api/response', bidderController.apiGetResponse)
router.get('/api/bidding_products', bidderController.apiGetBiddingProducts)
router.get('/api/win_products', bidderController.apiGetWinProducts)
router.get('/api/request_to_seller', bidderController.apiRequestToSeller)
   


router.use('/profile', profileRouter)

module.exports = router; 