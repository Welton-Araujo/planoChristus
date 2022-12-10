/**
 * @AWS     Modulo pode conter tratamentos, padronização, etc, antes da comunicação com a AWS via AWS.api.
 * 
 * @OBSERVACAO  Em .env: UPLOAD_ENABLED=true (ativara a lib express-busboy)
 *              Com isso teremos dois padroes de nome de key do objeto file:
 *              Na lib express-busboy:     file.filename (upload de arquivos no server)
 *              Na lib busboy-body-parser: file.name     (cria req.files)
 * @ATENCAO     A ativação do UPLOAD_ENABLED impactara na function @defaultFilenames , 
 *              quando for feita a leitura: file.name
 */
const AWS = require('./AWS.api')
const { UPLOAD_ENABLED } = require('../../../config')
const { isFilled:have } = require ('../../validations')


/**
 * @Info
 * @Obs Se ativar a opção multi, no middleware, o 'file_0' vira um Array: { file_0:[{name,...}], ...}
 * @param {*} name  Nome de um serviço: salon ou collaborator ou service
 * @param {*} id    Um id que define um relacionamento: salonId ou ...
 * @param {*} files Arquivos oriundo do req.file. 
 * @returns obj { error, files[{file, path}, ...] }
 */
const defaultFilenames = async (name, id, files)=>{
    console.log('defaultFilenames:')
    try {
        let errorFile   = true
        const defaultFiles = []  
        for await (const key of Object.keys(files)) {
            //Arquivo:
            const file     = files[key]//[0]// Com Multi ativado
            //A lib express-busboy, esta ativa?
            // const fileName = UPLOAD_ENABLED ? file.filename : file.name 
            const fileName = file.name 

            //Novo padrao de nome arquivo: name/id/data-in-miliseg.extension 
            const nameParts      = fileName.split('.')              // ['namefile123','jpg']
            const extension      = nameParts[nameParts.length -1]   // jpg
            const dateInMilisec  = new Date().getTime()             // 1665752480449
            const fileNameInDate = `${dateInMilisec}.${extension}`  // 1665752480449.jpg
            //Novo padrao de nome arquivo:
            const folderPath     = `${name}/${id}/${fileNameInDate}`// service/6346b370c8edd23aa9295c5e/1665752480449.jpg
    
            //Atualizando:
            defaultFiles.push({ file, folderPath })
            errorFile = false
            // console.log('FOROF...',key, errorFile, defaultFiles)
        }
        return { error:errorFile, files:defaultFiles }
    } catch (error) {
        return { error:true, message:error, files:null }
    }
}

/**
 * @Info A AWS.api já detem todos os params necessarios (oriundo do config/) para o POST/PUT.
 * @param {*} files Arquivos oriundo do req.file. 
 * @returns obj { error, message, files[{file, path}, ...] }
 */
const push = async ( files ) =>{
    console.log('AWS::push')
    try {
        //Enviar para AWS: (OBS. await parace nao funcionar com ForEach!)
        files.forEach( async ({ file, folderPath }) =>{ 
            // console.log('AWS PUSH...', folderPath)
            await AWS.uploadToS3(file, folderPath)
                    .then(resp=>console.log('API_AWS::Then', resp))
                    .catch(err=>console.log('API_AWS::Error', err))
        })
        return { error:false, files }
    } catch (error) {
        return { error:true, message:error, files:null}
    }   
}

/**
 * @Info Interface com tratativas previas antes de acionar o push:
 * @param {*} service 
 * @param {*} req 
 * @returns 
 */
const pushSafe = async ( service, files )=>{
    console.log('AWS::pushSafe' )
    let defaultFiles = { error:true, files:[] }

    //TEM ARQUIVO(S)? CRIAR:
    if( have(files) ){ defaultFiles = await defaultFilenames('service', service.salonId, files) }
    if( defaultFiles.error ){ return { error:true, message: "Error na leitura dos arquivos.", files:[] } }

    //AWS PUSH:
    const { error:AWSError, files:AWSfiles } = await push(defaultFiles.files)
    if( AWSError || !AWSfiles ){ return { error:true, message: "Error na publicação para AWS.", files:[] } }
    
    return { error:false, files:AWSfiles }
}

/**
 * @Info A AWS.api já detem todos os params necessarios (oriundo do config/) para o delete.
 * @param {*} path 
 * @returns 
 */
const deleteFile = async (path)=>{
    console.log('AWS::deleteFile', path)
    try {        
        // const resp = await AWS.deleteFileS3(path)
        
        //Futuramente: Se precisar, tratar a resposta...

        return { error:false, message:'Arquivo deletado com sucesso da AWS.', file:path }
    } catch (error) {
        return { error:true, message:error.message, file:null }
    }
}



module.exports = {

    defaultFilenames,
    push,
    pushSafe,
    deleteFile,

}