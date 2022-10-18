/**
 * @CLIENT_MODEL
*/

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const client = new Schema({
    name: {
        type: String,
        required:[true, 'O nome é obrigatório']
    },
    phone:  {
        type: String,
        required: true
    },
    email: {
        type:String,
        required: [true, 'O email é obrigatório'],
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
        enum:['M','F'],
        required: true
    },
    status:{
        type: String,
        enum:['A','I'],
        required: true,
        default: 'A'
    },
    document:{
        type: {
            type: String,
            enum:['individual','corporation'],//site pagar.me: individual(cpf) or corporation(cnpj)
            required: true
        },
        number: {
            type: String,
            required: true
        }
    },
    address: {
        road: String,
        number: String,
        district: String,
        zipCode: String,
        city: String,
        state: String,
        country: String,
    },
    geo:{
        type: String,
        coordinates: Array
    },
    dateRegistration:{
        type: Date,
        default: Date.now,
    }
})

salon.index({ geo: '2dsphere' })//2d: Lat e long

module.exports = mongoose.model('Client', client)