const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name : {
        type: String
    },
    parent_category : {
        type: String
    }
}, { timestamps: true })

const Category = mongoose.model('Category', categorySchema);
module.exports = { Category }


