const mongoose = require('mongoose')
const Schema = mongoose.Schema

const collaboratorService = new Schema({
    collaboratorId: {
        type: mongoose.Types.ObjectId,
        ref: 'Collaborator',
        required: true
    },
    serviceId: [{
        type: mongoose.Types.ObjectId,
        ref: 'Service',
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

module.exports = mongoose.model('CollaboratorService', collaboratorService)