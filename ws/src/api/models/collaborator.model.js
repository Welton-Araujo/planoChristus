/**
 * @COLLABORATOR_MODEL
*/

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
        default: null
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
        enum:['m','f'],
        required: true
    },
    status:{
        type: String,
        enum:['a','i','e'],
        required: true,
        default: 'a'
    },
    bankAccount:{
        owner:{
            type: String,
            // required: true,
        },
        cpfCnpj:{
            type: String,
            // required: true,
        },
        bank:{
            type: String,
            // required: true,
        },
        type:{
            type: String,
            enum:[
                "conta_corrente",
                "conta_poupanca",
                "conta_corrente_conjunta",
                "conta_poupanca_conjunta",
            ],
            // required: true,
        },
        agency:{
            type: String,
            // required: true,
        },
        number:{
            type: String,
            // required: true,
        },        
        dv:{//digito validador
            type: String,
            // required: true,
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