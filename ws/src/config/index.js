/**
 * @VARIABLE  Este módulo exporta as VAR/CONST de configurações:
 * @ENV       Nao utilizar process.env.VAR dentro do projeto.
 * @VANTAGEM  Se remonear uma constante do .env, nao precisa-la procura em todo o projeto para alter-la, basta corrigir aqui.
*/

const dotenv = require('dotenv')
//carregar o .env no process.env
dotenv.config({})

//Tentativa de reconfiguracao (NAO DEU CERTO USAR O .env.test):
dotenv.config({ patth: process.env.NODE_ENV || '.env' })

//NODE TIMEZONE CONFIG:
// process.env.TZ = "America/Sao_Paulo"
// console.log(new Date().toString())
// console.log(new Date().toLocaleString())

module.exports = Object.freeze({

  SECRET:           process.env.APP_SECRET,
  NODE_ENV:         process.env.NODE_ENV,
  UPLOAD_DIR:      (process.env.UPLOAD_DIR) ? process.env.UPLOAD_DIR:"./storage/upload",
  UPLOAD_ENABLED:  (process.env.UPLOAD_ENABLED==="true") ? true : false,//CAST Bool

  TOKEN:      process.env.JWT_SECRET,
  TOKEN_TEST: process.env.JWT_TEST_TOKEN,

  MONGODB:{
    PROTOCOLO:  process.env.MONGODB_PROTOCOLO,
    SRV:        process.env.MONGODB_SRV,
    HOST:       process.env.MONGODB_HOST,
    PORT:       process.env.MONGODB_PORT,
    DB_NAME:    process.env.MONGODB_DB_NAME,
    DB_USER:    process.env.MONGODB_DB_USER,
    DB_PASS:    process.env.MONGODB_DB_PASS,
    PARAMS:     process.env.MONGODB_PARAMS,
  },
  
  EXPRESS:{
    PORT: process.env.EXPRESS_PORT
  },

  AWS:{
    IAM_USER_KEY:     process.env.AWS_IAM_USER_KEY,
    IAM_USER_SECRET:  process.env.AWS_USER_SECRET,
    BUCKET_NAME:      process.env.AWS_BUCKET_NAME,
    AWS_REGION:       process.env.AWS_REGION,
  },

  PAGARME:{
    VERSION:"v4",
    DOC:    "https://docs.pagar.me/v4/reference/principios-basicos",
    URI:                      process.env.PAGARME_URI || "https://api.pagar.me/1",
    ENDPOINT_CREATE_ACCOUNTS: process.env.PAGARME_ENDPOINT_CREATE_ACCOUNTS || "/bank_accounts",
    ENDPOINT_RECEIVER:        process.env.PAGARME_ENDPOINT_RECEIVER || "/recipient",
    ENDPOINT_CUSTOMER:        process.env.PAGARME_ENDPOINT_CUSTOMER || "/customer",
    ENDPOINT_TRANSACTIONS:    process.env.PAGARME_ENDPOINT_TRANSACTION || "/transactions",
    API_KEY:                  process.env.PAGARME_API_KEY,
    APP_FEE:                  process.env.PAGARME_APP_FEE || "99",
    APP_RECIPIENT_ID:         process.env.PAGARME_APP_RECIPIENT_ID || "fds4654f6we54ffhyt4"
  },

  MAIL: {
    HOST: process.env.MAIL_HOST,
    PORT: process.env.MAIL_PORT,
    USER: process.env.MAIL_USER,
    PASS: process.env.MAIL_PASS,
  },

})