/**
 * @VARIABLE  Este módulo exporta as VAR/CONST de configurações:
 * @ENV       Nao utilizar process.env.VAR dentro do projeto.
 * @VANTAGEM  Se remonear uma constante do .env, nao precisa-la procura em todo o projeto para alter-la, basta corrigir aqui.
*/


module.exports = Object.freeze({

  SECRET:     process.env.REACT_APP_SECRET,

  TOKEN:      process.env.REACT_APP_JWT_SECRET,
  TOKEN_TEST: process.env.REACT_APP_JWT_TEST_TOKEN,
  
  SERVER: {
    URL:  process.env.REACT_APP_SERVER_URL || 'http://localhost:3000',
  } 
  
})