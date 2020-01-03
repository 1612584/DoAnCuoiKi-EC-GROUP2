const { Product } = require('../../models/product')
const { Category } = require('../../models/category')
const mongoose = require('mongoose');

const moment = require('moment')
        moment.locale('vi-VN');

module.exports = {
    getHome: async function(req, res) {
        
        var currentdate = new Date;
        const category = await Category.find({});
        const ProductNearEnd = await Product.find(
            {timeEnd:{$gt:currentdate}},
            (err,doc)=>{}
        )
        .populate({
            path: 'bidders.bidder',
            populate: {
                path: 'user'
            }
        })
        .sort({timeEnd:-1})
        .limit(5);

        const MostExpensiveProduct= await Product.find(
            {timeEnd:{$gt:currentdate}},
            (err,doc)=>{}
        )
        .populate({
            path: 'bidders.bidder',
            populate: {
                path: 'user'
            }
        })
        .sort({priceCurrent:-1})
        .limit(5);

        const HottestProduct= await Product.find(
            {timeEnd:{$gt:currentdate}},
            (err,doc)=>{}
        )
        .populate({
            path: 'bidders.bidder',
            populate: {
                path: 'user'
            }
        })
        .sort({bidders:-1})
        .limit(5);
        
        res.render('pages/guest/index',{
            category,
            ProductNearEnd,
            MostExpensiveProduct,
            HottestProduct,
            isAuthenticated : req.user,
            moment
        });
    },
    logOut: (req, res) => {
        console.log('voday')
        req.logOut();
        res.redirect('/')
    }
}

