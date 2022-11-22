/**
 * @SALON_CLIENT_MODEL
 * @RELATIONSHIP
*/

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const salonClient = new Schema({
    salonId: {//use: .populate()
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
        enum:['a','i'],
        required: true,
        default: 'a'
    },
    dateRegistration:{
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('SalonClient', salonClient)