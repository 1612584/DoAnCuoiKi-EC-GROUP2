var express = require('express');
var products = express.Router();
const manager = require('../../controllers/admin/products/manager');


// /users
// products.get('/', function (req, res, next) {
//     res.render('pages/admin/products');
// });

//get List
products.get('/', manager.read);
//get one by ID
products.get('/:productID',manager.readByID);
//delete by ID, req.body.active (default false)= true => recover
products.post('/:productID/delete',manager.delete);
// router.get('/products',async (req,res)=>{
//     console.log('products of admin');
//     Product.find({
        
//     },(err,products)=>{
        
//         if(err) throw(err);
//         //console.log(doc);
//         //res.json(doc);
       
//         res.render('pages/admin/productManagement',{
//             title: "Quản lý sản phẩm",
//             products: products
//         });
//     })
//     //console.log(products);
//     //res.json(products);
     
// });
module.exports = products;