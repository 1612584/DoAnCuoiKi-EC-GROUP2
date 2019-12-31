const multer = require('multer');
const path = require('path');
const randomstring  = require('randomstring')

const storage = multer.diskStorage({
    destination: 'public/uploads',
    filename: function(req, file, callback) {
        callback(null, randomstring.generate() + '-' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage,
    fileFilter: function(req, file, cb) {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if(mimetype && extname){
            return cb(null, true);
        }
        else {
            cb('Error: Images Only!');
        }
    }
})

module.exports = {upload}