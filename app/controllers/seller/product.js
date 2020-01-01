// const {Product} = require('../../models/product');
// const multer = require('multer');
// const path = require('path');
// const mongoose = require('mongoose');
// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, 'public/images');
//     },

//     // By default, multer removes file extensions so let's add them back
//     filename: function(req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });
// module.exports.postProduct = ((req,res)=>{
//     let upload = multer({storage:storage}).array('files',10);
//     upload(req,res,(err)=>{
//         if(err) req.json(err);
//         else{
//             //handle trung ten, chua co nguoi ban, chua luu images
//             console.log('form post products');
//             const productName = req.body.name;
//             const categoryId = req.body.category;
//             const images = req.files;
//             const giaHan = req.body.giaHan;
//             const startPrice = req.body.startPrice||6000;
//             const buyPrice = req.body.buyPrice || null;
//             const content = req.body.editor1;
//             const seller = mongoose.Types.ObjectId("5dde9e7dfa42cc405e64a4f8");
//             const product =  new Product({
//                 name: productName,
//                 category: mongoose.Types.ObjectId(categoryId),
//                 description: content,
//                 seller: seller,
//                 priceStart: startPrice,
//                 price: startPrice
//             });
//              product.save();
//              res.send("ok");
           
//             // console.log(`content ckeditor ${content}`);
//             // for(img of images){
//             //     console.log(img.originalname);
//             // }
//             // console.log(`product name, category,image + ${categoryId} +${giaHan}`)
//             // res.json({product_name:productName,categoryId:categoryId});
//         }
//     })
    
// })
