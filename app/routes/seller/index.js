var express = require('express');
var router = express.Router();

const sellerController = require('../../controllers/seller')
// const sellerProductRouter = require('./product');
// router.get('/', sellerController.get);
// router.use('/products', sellerProductRouter);
const { upload } = require('../../configs/fileUpload')
const cpUpload = upload.fields([
    { name: 'main_img', maxCount: 1 }, 
    { name: 'files', maxCount: 8 }
])

router.get('/', sellerController.get);
router.post('/products/post', cpUpload, sellerController.postProduct)


// router.get('/api/check_for_bid/:idProduct/:idBidder', sellerController.checkForBid)

module.exports = router;