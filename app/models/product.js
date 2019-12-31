const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    },
    priceNow: {
        type: Number
    },
    priceStart: {
        type: Number,
        required: true
    },
    priceCurrent: {
        type: Number
    },
    priceStep: Number,
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    winner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    images : {
        main : {
            type: String
        },
        more : [{
            type : String
        }]
    },
    tinyDes : {
        type: String
    },
    fullDes : {
        type: String
    },
    bidders : [{
        bidder : {
            type: Schema.Types.ObjectId,
            ref: 'Bidder'
        },
        price : {
            type: Number
        },
        date: {
            type: Date
        },
        isWaitingSeller: {
            type: Boolean,
            defaul: false
        }
    }],
    timeEnd : {
        type: Date
    },
    isAutoAdd : {
        type: Boolean
    }
}, { timestamps: true })

const Product = mongoose.model('Product', productSchema);
module.exports = { Product }


