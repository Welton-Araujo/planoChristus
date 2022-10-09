const mongoose = require('mongoose')
const Schema = mongoose.Schema

const scheduling = new Schema({
    clientId: {
        type: mongoose.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    salonId: {
        type: mongoose.Types.ObjectId,
        ref: 'Salon',
        required: true
    },
    serviceId: {
        type: mongoose.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    collaboratorID: {
        type: mongoose.Types.ObjectId,
        ref: 'Collaborator',
        required: true
    },
    date:{
        type: Date,
        default: Date.now,
    },    
    commission:{
        type: Number,// % of commission on price
        required: true
    },
    value:{
        type: Number,// price
        required: true
    },
    transactionId:{
        type: String,
        required: true
    },
    dateRegistration:{
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('Scheduling', scheduling)