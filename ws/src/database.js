/**
 * @DATABASE Estabelece a CONEXÃO com o mongodb/database.
*/
const mongoose = require('mongoose')

const { 
    MONGODB: { PROTOCOLO, SRV, HOST, PORT, DB_NAME, DB_USER, DB_PASS, PARAMS } 
} = require('./config')

const URI = `${PROTOCOLO}://${HOST}:${PORT}/${DB_NAME}${PARAMS}`
// const URI = `${PROTOCOLO}${SRV}://${DB_USER}:${DB_PASS}@${HOST}/${DB_NAME}${PARAMS}`

// mongoose.set('useNewUrlParser', true)
// mongoose.set('useUnifiedTopology', true)
// mongoose.set('useFindAndModify', false)
// mongoose.set('useCreateIndex', true)

const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

//CONEXAO COM O MONGODB:
mongoose.connect(`${URI}`, OPTIONS)
    .then(resp=>console.log('MongoDB is UP! ->', URI))
    .catch(err=>console.log('MongoDB erro:',err))