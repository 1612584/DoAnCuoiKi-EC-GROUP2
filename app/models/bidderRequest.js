const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const bidderRequestSchema = new Schema({
    bidder: {
        type: Schema.Types.ObjectId,
        ref: 'Bidder',
        index:true, unique:true,sparse:true
    },
    dateRequestString: String,
}, { timestamps: true})

const BidderRequest = mongoose.model('BidderRequest', bidderRequestSchema);
module.exports = { BidderRequest }

/*
    Trường status:
        - true: đã là seller
        - false: chưa
*/