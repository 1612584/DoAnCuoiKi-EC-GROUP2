const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const sellerSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    },
    timeOff: {
        type: Boolean,
        default: false
    },
    dateStartString: String,
    dateExpireString: String,
    fromNow: String,
    sellerExpires: Date
}, { timestamps: true})

const Seller = mongoose.model('Seller', sellerSchema);
module.exports = { Seller }

/*
    Trường timeOff:
        - true: đủ ngày
        - false: chưa
*/