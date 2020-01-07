const cloudinary = require('cloudinary').v2
const mongoose = require('mongoose')
const { Seller } = require('../../models/seller');
const { Product } = require('../../models/product');
const { Category } = require('../../models/category');
const {User} = require('../../models/user');
const {Bidder} = require('../../models/bidder');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

module.exports = {
    get: async (req, res) => {
        const categories = await Category.find();
        res.render('pages/seller/index', { categories: categories,result:false,message:"" });
    },
    //chưa có ngày kết thúc đấu giá 
    postProduct: async (req, res) => {
        const name = req.body.name;
        
        var categories = await Category.find();

        const auto_add = req.body.auto_add;
        const price_start = req.body.price_start || 6000;
        const price_now = req.body.price_now || null;
        const price_step = req.body.price_step;
        const content = req.body.editor1;

        
        const { main_img: mainArr, files: extra } = req.files;
       
        const categoryId = mongoose.Types.ObjectId(req.body.category);
        console.log(req.user);
        console.log('req.user_id: '+req.user_id);
        const seller = mongoose.Types.ObjectId(req.user._id);
        console.log('extra '+ extra.length);

         if(extra.length<2){

            res.render("pages/seller/index",{
                result: true,message: "bạn phải nhập ít nhất ba ảnh",categories:categories
            })
        }else{
const { url: main } = await cloudinary.uploader.upload(mainArr[0].path).catch(err => res.json(err))//lỗi ở upload
        let more = [];
        console.log('extra '+ extra.length);
        for (let item of extra) {
            const result = await cloudinary.uploader.upload(item.path).catch(err => { throw (err) })
            more.push(result.url)
        }
        var date=new Date();
        function addDays(date, days) {
            var result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
          }
        date=addDays(date,3);
        //let tinyDes=content.substr(0,content.indexOf("</p>"));
        try {
            const product = new Product({
                name,
                // ! Thiếu field category nè
                category: categoryId,
                priceCurrent: price_start, //sua lai theo models product
                priceStep: price_step,
                priceStart: price_start,
                priceNow: price_now, //gia mua ngay
                seller: seller,
                images: { main, more },
                fullDes: content,
                isAutoAdd: !!auto_add,
                timeEnd:date
            })

            const savedProduct = await product.save();
            console.log(savedProduct)
            //req.flash('notify', 'Đăng sản phẩm thành công')
            res.render('pages/seller/index',{result:true,message:"Đăng sản phẩm thành công",categories:categories})
            // res.json({ message: 'creating' })
        } catch (error) {
            console.log('err' + error);
            res.render('pages/seller/index',{result:true,message:"Đăng sản phẩm thất bại",categories:categories})
        }

        }
        

        // truoc mat cho bidder dc create
        // const seller = await Seller.findOne({user: req.user_id})
        // const { name, price_start, price_now, price_step, description, auto_add, no_auto_add } = req.body;


    },
    //Xem danh sách sản phẩm đang đăng và còn hạn 
    getProductList: async (req, res) => {
        const sellerId = req.user._id || "5e06daa1ca65b90bb86fce1d";
        const seller = mongoose.Types.ObjectId(sellerId);
        console.log(`sellerId = ${req.user_id} Object ${seller}`)
        const context = {
            products: [],
            winners: []
        }
        res.render('pages/seller/productList',context);
        // res.json(products);
        // res.render('pages/seller/productList', { products: products });
    },
    //san pham dang dang va con han hoac san pham
    getProductListAndFilter: async (req, res) => {
        const sellerId = req.user._id || "5e06daa1ca65b90bb86fce1d";
        //console.log(req.user_id)
        const seller = mongoose.Types.ObjectId(sellerId);
        const filter = req.query.active || true;
        console.log(filter + " true/false")
        if (filter == "true") {
            //dang dang va con han
            const now = new Date();
            console.log(`date now is ${now}`)
            Product.find({
                seller: seller,
                isEnd: false
            })
                .then(products => {
                    console.log(products[0]),
                    res.json({products:products})
                })
                .catch(err => { throw (err) })
        } else {
            //da co nguoi mua ngay / hoac nguoi thang dau gia
            const now = new Date();
            console.log(`date now is ${now}`)
            Product.find({
                seller: seller,
                $or: [
                    { isEnd: true }
                ]
            }).populate({
                path: 'winner.info',
                model: 'Bidder'
            })
                .then(async(products) => {
                    // console.log(products),
                    let winners = [];
                    for(product of products){
                        console.log(`time end get list filter: ${product.timeEnd}`)
                         if(product.winner.info!=undefined){
                            let bidder =await Bidder.findOne({
                                _id: product.winner.info._id
                            }).populate('user');
                            product.winnerInfo = bidder;
                            winners.push(bidder)
                         console.log(product.winnerInfo)
                         }
                         
                        // console.log(bidder.user)
                        // let user = await User.findOne({_id:product.winner.info.user});
                        // if(user != undefined){
                        //     console.log(product._id)
                        //     console.log(user.fullname);
                        // }
                       
                    }
                    const context = {
                        products: products,
                        winners: winners
                    }
                    res.json(context);
                })
                .catch(err => { throw (err) })
        }
    }
}