const mongoose = require('mongoose');
const { Product } = require('../../../models/product')
const { Category } = require('../../../models/category')
const mailer = require('../../../misc/mailer')
const {endTimeToSellerNotBidder} = require('../../../misc/content_mail')

const moment = require('moment')
        moment.locale('vi-VN');
const SIZE_PER_PAGE = 8;
module.exports = {
    listProduct: async (req, res) => {
        const { 
            search_name: searchName, search_category: searchCategory, category, page=1, sort='-1'
        } = req.query;
        const categoriesForMenu = await Category.find({});
        let products;
        let conditions;
        let title;
        let totalProduct;
        let allProducts
        if(category) {
            conditions = { category: mongoose.Types.ObjectId(category), isEnd: false }
            allProducts = await Product.find(conditions);
            products = await Product.find(conditions)
                .populate({
                    path: 'bidders.bidder',
                    populate: {
                        path: 'user'
                    }
                })
                .limit(SIZE_PER_PAGE)
                .skip((page==1)? 0:SIZE_PER_PAGE * page)
            let categoryDb = await Category.findByIdAndUpdate(category);
            title = categoryDb.name;
            totalProduct = allProducts.length;
            return res.render('pages/guest/categories/category', {
                category: categoriesForMenu,
                products,
                title,
                sort,
                totalProduct,
                pageCurrent: page,
                urlCurrent: req.url.substring(1),
                isAuthenticated : req.user,
                moment
            });
        }
        else {
            title =`Tìm kiếm. Tên sản phẩm: ${searchName || ''}` ;
            conditions = {
                name: { $regex: searchName || '', $options: 'i'}, isEnd: false
            };
        }
        let searchedCategoryIds;
        if(searchCategory) {
            const categories = await Category.find({name: {$regex: searchCategory, $options: 'i'}})
            searchedCategoryIds = categories.map(category => category._id)
            conditions.category = searchedCategoryIds;
            title = title + ` và Tên danh mục: ${searchCategory}`
        }
        allProducts = await Product.find(conditions);
        totalProduct = allProducts.length;
        products = await Product.find(conditions)
        .populate({
            path: 'bidders.bidder',
            populate: {
                path: 'user'
            }
        })
        .limit(SIZE_PER_PAGE)
        .skip((page==1)? 0:SIZE_PER_PAGE * page);
        
        
        res.render('pages/guest/categories/category', {
            category: categoriesForMenu,
            products, 
            sort, 
            title,
            totalProduct,
            pageCurrent: page,
            urlCurrent: req.url.substring(1),
            isAuthenticated : req.user,
            moment
        });
    },
    updateTime: async function(req, res){
        const products = await Product.find().populate('seller');
        let isEnd;
        let seller;
        let winner;
        for(let product of products) {
            isEnd = Date.now() > product.timeEnd;
            
            seller = product.seller;
            winner = product.winner;

            if(isEnd) {
                
                if(product.bidders.filter(bidder => !bidder.isWaitingSeller).length == 0) {
                    // khong co nguoi dau gia
                    
                    await mailer.sendMail(product.seller.email, endTimeToSellerNotBidder(`http://localhost:3006/product/detail/${product._id}`))
                }
                else {
                    // co nguoi dau gia
                    
                }
            }
            await product.update({isEnd})
        }
        
        res.redirect('/');
    },
    getById: async function(req, res){
        const {ID: idProduct} = req.params;
        const product = await Product.findById(idProduct)
                                        .populate('category')
                                        .populate('seller')
                                        .populate({
                                            path: 'bidders.bidder',
                                            populate: {
                                                path: 'user',
                                            }
                                        });
        
        const categories = await Category.find({});
        res.render('pages/guest/products/detail', {
            category: categories,
            product,
            isAuthenticated : req.user,
            moment
        });
    },
    search: async function (req, res){
        res.redirect('/product/')
        res.json({success: true})
        
        // const name = req.query.name||"";
        // const categoryId = new mongoose.Types.ObjectId(req.query.categoryId); 
        // console.log('search product by name categoryId'+categoryId);
        // try{
        //     let products = await Product.find({
        //        $and : [{
        //         name: new RegExp(name, "i") 
        //         ,active: true
        //     }  ]        
        //     }).populate('category');
        //     products.forEach(product=>console.log(product.category._id))
        //     let product = products.filter(product=>product.category._id == categoryId)
        //     // products = await products.filter(product=>{
        //     //     console.log(product.Category._id)
        //     //     product.category._id != null
        //     // }) 
        //     console.log('result = arr.length ' + products.length);
        //     res.json({
        //         amount: products.length,
        //         products: products
        //     });

        // }catch (err){
        //     //console.log(err);
        //     res.json(err)
        // }
	    
    }
}
