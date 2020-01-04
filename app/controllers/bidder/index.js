const mongoose = require('mongoose')
const { BidderRequest } = require('../../models/bidderRequest')
const { User } = require('../../models/user'); 
const { Product } = require('../../models/product');
const { Bidder } = require('../../models/bidder');
const mailer = require('../../misc/mailer')
const moment = require('moment')
moment.locale('vi-VN');
const { bidSuccess, bidOver, sellerHaveBidder } = require('../../misc/content_mail')

module.exports = {
    apiRequestToSeller: async (req, res) => {
        const bidder = await Bidder.findOne({user: req.user._id})
        const requestBidder = await BidderRequest.findOne({bidder: bidder._id})
        if(requestBidder) {
            return res.json({success: false, error: 'Đã xin rồi. Vui lòng đợi admin duyệt.'})
        }
        const dateString = moment().format("h:mm a, dddd, Do MMMM YYYY")
        
        const newBidderRequest = new BidderRequest({
            bidder: bidder._id,
            dateRequestString: dateString
        })
        newBidderRequest.save((err, doc) => {
            res.json({success: true, message: 'Xin thành công. Vui lòng đợi admin duyệt.'})
        });
    },
    apiAddToFavorite: async (req, res) => {
        const idProduct = req.params.idProduct;
        const bidder = await Bidder.findOne({user: req.user._id})
        if(!bidder) return res.json({success: false, error: 'Không tìm được bidder này trong hệ thống'})
        let isHas = false;
        bidder.favoriteList.forEach(item => {
            if(item.product.toString() === idProduct.toString()) {
                isHas = true;
            }
        })
        if(isHas) {
            return res.json({success: false, error: 'Đã có trong danh sách yêu thích rồi'})
        }
        const updateBidder = await Bidder.findOneAndUpdate(
            {user: req.user._id},
            {
                $push: { favoriteList: {
                    product: mongoose.Types.ObjectId(idProduct)
                }},
            },
            {new: true}
        )
        res.json({success: true, message: 'Đã thêm thành công', updateBidder})
    },
    apiGetListFavorite: async (req, res) => {
        const { favoriteList } = await Bidder.findOne({user: req.user._id})
                                    .populate({
                                        path: 'favoriteList.product',
                                        model: 'Product'
                                    })
                                    .exec();
        res.json({success: true, favoriteList})
    },
    apiBid: async (req, res) => {
        const idProduct = req.params.id;
        const price = req.query.price;
        if(!price) {
            return res.json({success: false, error: 'Chưa truyền giá mua'})
        }
        const product = await Product.findById(idProduct).populate({
            path: 'bidders.bidder'
        })
        const bidder = await Bidder.findOne({user: req.user._id}).populate('user');
        // Xử lí giá truyền vào
        if(price <= product.priceCurrent) 
            return res.json({success: false, error: 'Giá của bạn thấp hơn hoặc bằng giá đấu hiện tại. Vui lòng nhập lại.'})
        // Xử lí điểm đánh giá
        const { like, dislike } = bidder;
        const point = like / (like+dislike);
        if(point < 0.8) return res.json({success: false, error: 'Điểm đánh giá thấp hơn 80%. Không được đấu giá.'})
        
        
        let isWaiting = false;
        product.bidders.forEach(item => {
            if(item.bidder.toString() == bidder._id.toString()) {
                isWaiting = item.isWaitingSeller;
            }
        })

        // bị ban
        if(isWaiting) return res.json({success: false, error: 'Bạn đã bị cấm đấu giá sản phẩm này'})
        let updatedProduct;

        let update = (point) ? { 
                                    $push: { bidders: {
                                        bidder: bidder._id,
                                        price: price,
                                        date: Date.now(),
                                    }},
                                    priceCurrent: price
                                } : 
                                {   
                                    $push: { bidders: {
                                        bidder: bidder._id,
                                        price: price,
                                        date: Date.now(),
                                        isWaitingSeller: false,
                                    }},
                                    priceCurrent: price
                                };
        updatedProduct = await Product
        .findOneAndUpdate({_id: idProduct}, update, {new: true})
        .populate({
                    path: 'bidders.bidder',
                    model: 'Bidder',
                    populate: {
                        path: 'user',
                        model: 'User'
                    }
        })
        .populate('seller')
        .exec();
        // gửi mail thông báo

        let objRes = {
            updatedProduct,
            success: true,
            message: 'Đấu giá thành công'
        }
        // mail cho bidder
        if(!bidder.user.email) {
            objRes = {...objRes, message: 'Đấu giá thành công nhưng không thể gửi mail thông báo. Tài khoản chưa có email (do login bằng fb)', }
        }
        else {
            await mailer.sendMail(bidder.user.email, bidSuccess(`http://localhost:3006/product/detail/${idProduct}`))
        }
        
        let bidderMaxCur = updatedProduct.bidders.sort((a, b) => a.price > b.price)[updatedProduct.bidders.length -2]
        if(bidderMaxCur) {
            if(bidderMaxCur.bidder.user.email !== bidder.user.email) {
                await mailer.sendMail(bidderMaxCur.bidder.user.email, bidOver(`http://localhost:3006/product/detail/${idProduct}`))
            } 
        }

        if(!updatedProduct.seller.email) {
            // xử lý seller là tài khoản fb không có email
            // objRes = {
            //     updatedProduct,
            //     success: true,
            //     message: 'Đấu giá thành công'
            // }
        }
        else {
            await mailer.sendMail(updatedProduct.seller.email, sellerHaveBidder(`http://localhost:3006/product/detail/${idProduct}`))
        }
        res.json(objRes)
    },
    apiGetBidders: async (req, res) => {
        const id = req.params.id;
        const product = await Product.findById(mongoose.Types.ObjectId(id));
        const bidders = product.bidders;
        const validBidders = bidders.filter(item => !item.isWaitingSeller)
        res.json({message: 'success', bidders: validBidders})
    },
    apiGetResponse: async (req, res) => {
        const { like, dislike, response } = await Bidder.findOne({user: req.user._id})
                                    .populate({
                                        path: 'response.seller',
                                        model: 'User'
                                    })
                                    .exec();
        res.json({message: 'success', like, dislike, response})
    },
    apiGetBiddingProducts: async (req, res) => {
        const bidder = await Bidder.findOne({user: req.user._id});
        const products = await Product.find(
            {"bidders.bidder": bidder._id, "bidders.isWaitingSeller": false}
        )
        if(!products.length) return res.json({message: 'not play'})
        res.json({message: 'you have', products})
    },
    apiGetWinProducts: (req, res) => {
        res.json({message: 'not make'})
    }
}