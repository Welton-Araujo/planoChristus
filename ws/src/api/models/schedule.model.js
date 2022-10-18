/**
 * @SCHEDULE_MODEL
*/

const mongoose = require('mongoose')
const Schema = mongoose.Schema

//OBS: O mongodb salva o horario como GMT-0: são 3h a mais que o GMT-3(BR)
const schedule = new Schema({
    salonId: {//use: .populate()
        type: mongoose.Types.ObjectId,
        ref: 'Salon',
        required: true
    },
    services: [{//use: .populate()
        type: mongoose.Types.ObjectId,
        ref: 'Service',
        required: true
    }],
    collaborators: [{//use: .populate()
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

module.exports = mongoose.model('Schedule', schedule)