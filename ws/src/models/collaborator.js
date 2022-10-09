const mongoose = require('mongoose')
const Schema = mongoose.Schema

const collaborator = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type:String,
        required: true
    },
    passwd: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    dateBirth:{
        type: String,// YYYY-MM-dd. Não uso o 'Date' pq possui tbm hora.
        default: Date.now,
    },
    sex:{
        type: String,
        enum:['M','F'],
        required: true
    },
    status:{
        type: String,
        enum:['A','I'],
        required: true,
        default: 'A'
    },
    bankAccount:{
        owner:{
            type: String,
            required: true,
        },
        cpfCnpj:{
            type: String,
            required: true,
        },
        bank:{
            type: String,
            required: true,
        },
        type:{
            type: String,
            required: true,
        },
        branch:{
            type: String,
            required: true,
        },
        number:{
            type: String,
            required: true,
        },        
        digit:{
            type: String,
            required: true,
        },        
    },
    recipientId:{
        type: String,
        required: true
    },
    dateRegistration:{
        type: String,// YYYY-MM-dd. Não uso o 'Date' pq possui tbm hora.
        default: Date.now,
    }
})


module.exports = mongoose.model('Collaborator', collaborator)