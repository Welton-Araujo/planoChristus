const mongoose = require('mongoose')
const Schema = mongoose.Schema

const salonClient = new Schema({
    salonId: {
        type: mongoose.Types.ObjectId,
        ref: 'Salon',
        required: true
    },
    clientId: [{
        type: mongoose.Types.ObjectId,
        ref: 'Client',
        required: true
    }],
    status:{
        type: String,
        enum:['A','I'],
        required: true,
        default: 'A'
    },
    dateRegistration:{
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('SalonClient', salonClient)