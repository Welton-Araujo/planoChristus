/**
 * @COLLABORATOR_SERVICE_MODEL
 * @RELATIONSHIP
*/

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const collaboratorService = new Schema({
    collaboratorId: {//use: .populate()
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
        enum:['a','i'],
        required: true,
        default: 'a'
    },
    dateRegistration:{
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('CollaboratorService', collaboratorService)