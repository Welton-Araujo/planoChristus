const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schedules = new Schema({
    salonId: {
        type: mongoose.Types.ObjectId,
        ref: 'Salon',
        required: true
    },
    experts: [{
        type: mongoose.Types.ObjectId,
        ref: 'Service',
        required: true
    }],
    collaborators: [{
        type: mongoose.Types.ObjectId,
        ref: 'Collaborator',
        required: true
    }],
    day: {
        type: [Number],
        required: true
    },
    start:{
        type: Date,
        default: Date.now,
    },
    end:{
        type: Date,
        default: Date.now,
    },
    dateRegistration:{
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('Schedules', schedules)