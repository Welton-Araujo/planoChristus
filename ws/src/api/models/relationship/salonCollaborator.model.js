/**
 * @SALON_COLLABORATOR_MODEL
 * @RELATIONSHIP
*/

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const salonCollaborator = new Schema({
    salonId: {//use: .populate()
        type: mongoose.Types.ObjectId,
        ref: 'Salon',
        required: true
    },
    collaboratorId: [{
        type: mongoose.Types.ObjectId,
        ref: 'Collaborator',
        required: true
    }],
    status:{
        type: String,
        enum:['a','i', 'e'],
        required: true,
        default: 'a'
    },
    dateRegistration:{
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('SalonCollaborator', salonCollaborator)