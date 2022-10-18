/**
 * @Middleware Responsavel por configuração e permissao de upload de arquivos diretamente no Server.
 * 
 * @Info    Requests do tipo POST ou PUT (já foram testados), com file(s) anexado(s) em um multiForm/MultiData, 
 *          serão interceptado (já no route) por este MW. Automaticamente serão salvos no path configurado. 
 */
const busboyFileUpload = require('express-busboy')

const { UPLOAD_DIR, UPLOAD_ENABLED } = require('../../config')

const upload      = UPLOAD_ENABLED || false
const path        = UPLOAD_DIR     || './storage/upload'
const allowedPath = /./

/**
 * 
 * @param {*} app express() 
*/
module.exports = async ( app ) => {
    console.log(`FileUpload::Path:`, path, upload)
    await busboyFileUpload.extend(app, {
        upload,
        path,
        allowedPath,
    })
}