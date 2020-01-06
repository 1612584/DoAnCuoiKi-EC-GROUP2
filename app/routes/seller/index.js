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

router.get('/products/:ID', auth, seller, async function (req, res) {
    var productID = req.params.ID;
    var productdetail = await Product.findOne({
        _id: productID
    }).populate('seller')
        .populate({
            path: 'bidders.bidder',
            populate: {
                path: 'user'
            }
        })
    res.render('pages/seller/productDetail', {
        product: productdetail
    })
})

router.get('/:ID1/ban/:ID2', auth, seller, async function (req, res) {
    var productID = req.params.ID1;
    var bidderBanID = req.params.ID2;
    var product = await Product.findById({ _id: productID }).exec((err, result) => {
        if (result) {
            for (var i = 0; i < result.bidders.length; i++) {
                if (bidderBanID == result.bidders[i].bidder) {
                    result.bidders[i].isWaitingSeller = true;
                    result.save();
                }
            }
        }
    }); 
    await sleep(5000);
    res.redirect(`/sellers/products/${productID}`);
})

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



router.post('/products/:ID', auth, seller, async function (req, res) {
    var productID = req.params.ID;
    var productdetail = await Product.find({
        _id: productID
    });
    var testvalue = req.body.description;
    var date = new Date;
    today = formatDate(date);
    var Newdescription = productdetail[0].fullDes + '<br>' + today + '</br>' + testvalue;
    Product.findById({ _id: productID }, (err, product) => {
        if (err) res.json(err)
        else {
            if (product == null || product == undefined) {
                res.json('not found')
            } else {
                product.fullDes = product.fullDes + today + testvalue;
                product.save({}, (err, updatedProduct) => {
                    res.redirect(`/sellers/products/${productID}`);

                });
            }
        }
    })
})

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [day, month, year].join('-');
}
module.exports = router;