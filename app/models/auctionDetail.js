const mongoose = require('mongoose')

const auctionDetailSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    price: {
        type: String,
        required: true,
    }

}, { timestamps: true})

const AutionDetail = mongoose.model('AutionDetail', auctionDetailSchema)
module.exports = { AutionDetail }