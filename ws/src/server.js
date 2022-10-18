//SERVER:
const express   = require('express')
const app       = express()

//Configurações do dotenv e export de CONST:
const { EXPRESS } = require('../src/config')

//Variables:
app.set('port', EXPRESS.PORT || '8011')

//Middlewares de configurações:
require('./middlewares')(app, express)

//Conexao com o mongodb:
require('./database')

//Todas as rotas[]:
const routes = require('./routes')
app.use(routes)


app.listen(app.get('port'), ()=>{
    console.log(`WS run in port ${app.get('port')}`)
})