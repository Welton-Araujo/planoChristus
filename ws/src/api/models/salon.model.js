/**
 * @SALON_MODEL
*/

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const salon = new Schema({
    name: {
        type: String,
        required:[true, 'O nome é obrigatório']
    },
    photo: String,
    frontCover: String,
    email: {
        type:String,
        required: [true, 'O email é obrigatório'],
    },
    passwd: {
        type: String,
        default: null
    },
    phone: String,
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
    dateRegistration:{
        type: Date,
        default: Date.now,
    }
})

salon.index({ geo: '2dsphere' })//2d: Lat e long

module.exports = mongoose.model('Salon', salon)