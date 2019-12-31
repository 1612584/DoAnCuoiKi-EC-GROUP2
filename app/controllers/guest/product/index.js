const mongoose = require('mongoose');
const { Product } = require('../../../models/product')
const { Category } = require('../../../models/category')

const SIZE_PER_PAGE = 3;
module.exports = {
    listProduct: async (req, res) => {
        console.log(req.query)
        const { search_name: searchName, search_category: searchCategory, category, page=1, sort} = req.query;
        const categoriesForMenu = await Category.find({});
        let products;
        let conditions;
        if(category) {
            conditions = { category: mongoose.Types.ObjectId(category)}
            products = await Product.find(conditions).limit(SIZE_PER_PAGE).skip((page==1)? 0:SIZE_PER_PAGE * page)
            
            return res.render('pages/guest/categories/category', {
                category: categoriesForMenu,
                products
            });
        }
        else {
            conditions = {
                name: { $regex: searchName || '', $options: 'i'}
            };
        }
        let searchedCategoryIds;
        if(searchCategory) {
            const categories = await Category.find({name: {$regex: searchCategory, $options: 'i'}})
            searchedCategoryIds = categories.map(category => category._id)
            conditions.category = searchedCategoryIds;
        }
        
        products = await Product.find(conditions).limit(SIZE_PER_PAGE).skip((page==1)? 0:SIZE_PER_PAGE * page);
        let paramsSort;
        if(sort) {
            // paramsSort = { priceStart: 'asc', createAt: 'desc' }
            paramsSort = { name: 'asc' }
            products = await products.sort(paramsSort).exec();
        }
        console.log(conditions)
        console.log(products)
        res.render('pages/guest/categories/category', { products });
    },
    detail: function(req, res){
        res.render('pages/guest/products/detail');
    },
    getById: async function(req, res){
        const categories = await Category.find();
        res.render('pages/guest/products/detail', {category: categories});
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
