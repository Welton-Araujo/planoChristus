/***************************************|*************************************************\
|***                                                                                   ***|
|***                              @RESPONSEAPI                                         ***|
|***        Modulo que padroniza o formato de response usado nos controllers.          ***|
|*** Este formato também impoe aos services returns neste padrão para os controllers...***|
|***                                                                                   ***|
\*****************************************************************************************/


const _code = require('./HttpStatusCodeBR.js')

/**
 * @INFO  Para utilizar esta api é preciso enviar um JSON padronizado (olhar abaixo em params)
 *        Aconselha-se que envie este json-padronizado desde a na camada service...    
 * @param   {*} response{ data:{JSON}, message:String, status: 200 | 404... }
 * @returns {*} JSON{ code:200, status:'ok', action:'Sucesso...', message:'String', data:{JSON} }
 */
const auto = ( response )=>{
    const { codeChecked, statusChecked, action } = _code.hasError(response.status)
    response.code   = codeChecked
    response.status = statusChecked
    response.action = action
    // console.log(response)
    if ( response.code>=400 || response.data === undefined || response.data === null ) {
        return errorResponse(response)
    }    
    return successResponse(response) 
}

/**
 * 
 * @param {*} data 
 * @param {*} message 
 * @param {*} code 
 * @returns 
 */
 const successResponse = ({data={}, message='Requisição respondida', code=200, status='Sucesso', action }) => {//destructuring
    return {
        code    : code,
        status  : status,
        action  : action,
        message : message,
        data    : data,         
    }
}

/**
 * 
 * @param {*} data 
 * @param {*} message 
 * @param {*} code 
 * @returns {default}
 */
const errorResponse = ({data=null, message='Recurso não encontrado', code=404, status='Erro', action }) => {
    return {
        code    : code,
        status  : status,
        action  : action,
        message : message,
        data    : data
    }
}

module.exports = { 

    successResponse, 
    errorResponse, 
    auto, 
    _code,
}