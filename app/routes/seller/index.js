var express = require('express');
var router = express.Router();

const { Product } = require('../../models/product')
const { User } = require('../../models/user')

const auth = require('../../middleware/auth')
const seller = require('../../middleware/seller')
const sellerController = require('../../controllers/seller')

const { upload } = require('../../configs/fileUpload')
const cpUpload = upload.fields([
    { name: 'main_img', maxCount: 1 },
    { name: 'files', maxCount: 8 }
])

router.get('/', auth, seller, sellerController.get);
router.post('/products/post', auth, seller, cpUpload, sellerController.postProduct)
router.get('/products/getList', auth, seller,sellerController.getProductList);
router.get('/products/getList/filter', auth, seller, sellerController.getProductListAndFilter);
// router.get('/api/check_for_bid/:idProduct/:idBidder', sellerController.checkForBid)

module.exports = router;