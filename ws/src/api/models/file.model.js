/**
 * @FILE_MODEL
*/

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const file = new Schema({
    referenceId: {
        type: Schema.Types.ObjectId,
        refPath: 'model',// referenciacao dinamica
        // required: true
    },
    model: {
        type: String,
        required: true,
        enum: ['Service','Salon']
    },
    path: {
        type: String,
        required: true
    },
    meta:{
        name: String,
        encoding: {
            type: String,
            // enum:["7bit"]
        },
        mimetype: {
            type: String,
            enum:[
                "image/png",
                "image/jpg",
                "image/jpeg",
                "image/gif",
                "image/webp"
            ]
        },
        truncated: Boolean,
        size: Number
    },
    dateRegistration:{
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('File', file)