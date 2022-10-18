/***************************************|*************************************************\
|***                                                                                   ***|
|***                             @HTTPSTATUSCODE                                       ***|
|***           Modulo que padronizar Status de codigo Response Http:                   ***|
|***              Contem a logica para identificar qual é code.                        ***|
|***                                                                                   ***|
\*****************************************************************************************/

/**
 * Status de codigo Response Http
 */
const { _statusCode } = require('../../constants/httpcode.static')


/**
 * @Info  Retorno codigo junto com o titulo (status).
 * @param {*} code 
 * @returns { code, status } 
 */
const getStatusCodeByKey = (code) =>{
    const codeChecked    = validateCode(code)
    const statusChecked  = _statusCode[codeChecked]
    return {codeChecked, statusChecked}
}

/**
 * @Info Verifica se é um numero dentro do intervalo do code http.
 * @param {*} code 100 ate 599.
 * @returns 
 */
const validateCode = (code) => {
    console.log('HTTPSTATUSCODE::ValidetateCode:','CODE:',code,'STATUS:', _statusCode[code])
    return (_statusCode[code] === undefined) ? 404 : code
}

/**
 * @Info Verifica se o numero é um code http valido. 
 *       Se não um code valido, configura retorno para {404:Nao encontrado} 
 * @param {*} code http: 400, 404, ...
 * @returns CheckedObject {codeOK,statusOK}
 */
const hasError = (code) =>{
    const {codeChecked,statusChecked} = getStatusCodeByKey(code)
    
    const funs = [infoResponse, successResponse, redirectsResponse, clientError, serverError]
    for (const fun of funs) {
        let actionCorresponds = fun(codeChecked)
        if(actionCorresponds){
            return {codeChecked, statusChecked, 'action':actionCorresponds}
            
        }
    }    
}


//Respostas de informação (100-199)
const infoResponse = (code) =>{
    if(code>=100 && code<=199) return 'Informação'//true
    return false
}

//Respostas de sucesso (200-299)
const successResponse = (code) =>{
    if(code>=200 && code<=299) return 'Sucesso na resposta'//true
    return false
}

//Redirecionamentos (300-399)
const redirectsResponse = (code) =>{
    if(code>=300 && code<=399) return 'Redirecionamento'//true
    return false
}

//Erros do cliente (400-499)
const clientError = (code) =>{
    if(code>=400 && code<=499) return 'Erro do Cliente'//true
    return false
}

//Erros do servidor (500-599)
const serverError = (code) =>{
    if(code>=500 && code<=599) return 'Erro no Servidor'//true
    return false
}

module.exports = { getStatusCodeByKey, validateCode, hasError}
