/**
 * @SERVICE_MODEL
*/

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const service = new Schema({
    salonId: {
        type: mongoose.Types.ObjectId,
        ref: 'Salon',
        required: true
    },
    title: {
        type: String,
        required:true
    },
    price: {
        type: Number,
        required:true
    },
    duration: {
        type: Number,// in minute
        default: null
    },
    commission:{
        type: Number,// % of commission on price
        default: null
    },
    recurrence:{
        type: String,// service refraction period in days
        default: null
    },
    description:{
        type: String,
        default: null
    },
    status:{
        type: String,
        required: true,
        enum: ['A','I','D'],// Active, Inactive and Deleted
        default: 'A'
    },
    dateRegistration:{
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('Service', service)