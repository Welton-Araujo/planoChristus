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
            enum:['cpf','cnpj'],//site pagar.me: individual(cpf) or corporation(cnpj)
            required: true
        },
        number: {
            type: String,
            required: true
        }
    },
    address: {
        street: String,
        number: String,
        district: String,
        zipCode: String,
        city: String,
        state: String,
        country: String,
    },
    geo:{
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    customerId:{
        type: String
    },
    dateRegistration:{
        type: Date,
        default: Date.now,
    }
})

client.index({ geo: '2dsphere' })//2d: Lat e long

module.exports = mongoose.model('Client', client)