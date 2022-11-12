/**
 * @VARIABLE  Este módulo exporta as VAR/CONST de configurações:
 * @ENV       Nao utilizar process.env.VAR dentro do projeto.
 * @VANTAGEM  Se remonear uma constante do .env, nao precisa-la procura em todo o projeto para alter-la, basta corrigir aqui.
 */

//VALIDACAO:
const LOCALHOST   = process.env.REACT_APP_LOCALHOST   || "http://localhost"
const SERVER_PORT = process.env.REACT_APP_SERVER_PORT || "8011"


//OBJECTS:
const APP = {
  NAME: process.env.REACT_APP_WEBSITE_NAME || "@AGENDAMENTO",
  URL:  process.env.REACT_APP_URL          || "https://tomaker.tk",
  PORT: process.env.REACT_APP_PORT         || "3000",
  // SECURITY:
  SECRET: process.env.REACT_APP_SECRET,
  TOKEN: process.env.REACT_APP_JWT_SECRET,
  TOKEN_TEST: process.env.REACT_APP_JWT_TEST_TOKEN,
}

const SERVER = {
  URL:  process.env.REACT_APP_SERVER_URL || `${LOCALHOST}:${SERVER_PORT}`,
  PORT: SERVER_PORT,
}

console.log("API... CONFIG", { SERVER });

export { LOCALHOST, APP, SERVER };
