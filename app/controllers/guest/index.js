const { Product } = require('../../models/product')
const { Category } = require('../../models/category')
const mongoose = require('mongoose');
module.exports = {
    getHome: async function(req, res) {
        const category = await Category.find({});
        const product = await Product.find({},(err,doc)=>{}).limit(5);

        
        res.render('pages/guest/index',{
            category,
            product
        });
    },
}
