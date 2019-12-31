const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,

    },
    product: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    content: {
        type: String,
        required: true,
        
    },

}, { timestamps: true })

const Feedback = mongoose.model('Feedback', feedbackSchema)

module.exports = { Feedback }