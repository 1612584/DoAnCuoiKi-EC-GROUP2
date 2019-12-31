const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const bidderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    },
    like: {
        type: Number,
        default: 0
    },
    dislike: {
        type: Number,
        default: 0
    },
    response: [{
        seller: {
            type: Schema.Types.ObjectId,
            ref: 'Seller'
        },
        isLike: Boolean,
        comment: {
            type: String,
            default: ''
        }
    }],
    favoriteList: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    }],
})

const Bidder = mongoose.model('Bidder', bidderSchema);
module.exports = { Bidder }
