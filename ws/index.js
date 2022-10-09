//SERVER:
require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')

//Middlewares:
app.use(morgan('dev'))

//Variables:
app.set('port', 8011)


app.listen(app.get('port'), ()=>{
    console.log(`WS run in port ${app.get('port')}`)
})