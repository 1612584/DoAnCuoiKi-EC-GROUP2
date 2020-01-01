const cloudinary = require('cloudinary').v2
const mongoose = require('mongoose')
const { Seller } = require('../../models/seller');
const { Product } = require('../../models/product');
const { Category } = require('../../models/category');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
module.exports = {
    get: async (req, res) => {
        const categories = await Category.find();
        res.render('pages/seller/index', { categories: categories });
    },
    postProduct: async (req, res) => {
        console.log('post product');

        const name = req.body.name;
        //const categoryId = req.body.category;
        // const images = req.files;
        const auto_add = req.body.auto_add;
        const price_start = req.body.price_start || 6000;
        const price_now = req.body.price_now || null;
        const price_step = req.body.price_step;
        const content = req.body.editor1;
        // const main_img = req.files.main_img;
        // const extra = req.files.files;
        //console.log(extra);
        // const mainArr = main_img;
        const { main_img: mainArr, files: extra } = req.files;
        const categoryId = mongoose.Types.ObjectId(req.body.category);
        const seller = mongoose.Types.ObjectId("5dde9e7dfa42cc405e64a4f8");

        const { url: main } = await cloudinary.uploader.upload(mainArr[0].path).catch(err=>res.json(err))//lỗi ở upload
        let more = [];
        for(let item of extra) {
            try {
                const result = await cloudinary.uploader.upload(item.path)
                more.push(result.url)
            } catch (error) {
                return res.json({error})
            }
        }
        try {
            const product = new Product({
                name,
                // ! Thiếu field category nè
                category: categoryId,
                price: price_start,
                priceStep: price_step,
                priceStart: price_start,
                priceNow: price_now,
                seller: seller,
                images: { main, more },
                fullDes: content,
                isAutoAdd: !!auto_add
            })

            const savedProduct = await product.save();
            console.log(savedProduct)
            req.flash('notify', 'Đăng sản phẩm thành công')

            res.redirect('/sellers')
            // res.json({ message: 'creating' })
        } catch (error) {
            console.log('err' + error);
            res.status(500).send(error);
        }


        // truoc mat cho bidder dc create
        // const seller = await Seller.findOne({user: req.user_id})
        // const { name, price_start, price_now, price_step, description, auto_add, no_auto_add } = req.body;


    }
}