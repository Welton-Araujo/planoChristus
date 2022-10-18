/**
 * @MIDDLEAWARES Contem todos os middlewares (libs e autorais) do app.
 *               Local apropriado para adicionar os novos middleware.
*/

//MW de libs:
const morgan            = require('morgan')
const cors              = require('cors')
const connectBusboy     = require('connect-busboy')
const busboyBodyParser  = require('busboy-body-parser')

//MW de Autorais:
// const fileUpload        = require('./copyright/fileUpload.middleware')


//Middlewares de configurações:
module.exports = async (app, express)=>{
    
    // fileUpload(app)//#ATIVAR ESTA GERANDO BUG

    app.use(morgan('dev'))
    app.use(express.json())
    app.use(connectBusboy())
    app.use(cors())
    app.use(busboyBodyParser({}))// Só ative se necessario: { multi: true }

}