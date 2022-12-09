const Busboy  = require('busboy')

const AWS = require('../../utils/external/aws')
// const { isEmpty } = require('../../utils/validations')

const ServiceRepository = require('../repositories/service.repository')
const SalonRepository   = require('../repositories/salon.repository')
const FileRepository    = require('../repositories/file.repository')


/**
 * @ServicesFull Obter os serviços (com arquivos) do salao.
 * @param {*} salonId 
 * @param {*} query 
 * @param {*} fields 
 * @returns 
 */
const getFullSalonServices = async (salonId, query={}, fields='-__v')=>{
    console.log('Service::getFullSalonServices', salonId)
    
    //BUSCAR SERVICOS:
    const { services } = await ServiceRepository.find(
        { salonId, status:{ $ne:'e' }, ...query }, 
        fields,
    )
    // console.log('services...', services)
    if( !services ){ return { erros:true, message:"Erro na busca dos serviços.", services:null } }

    //BUSCAR OS ARQUIVOS DOS SERVICOS:
    let servicesFull = []
    for (const service of services) {
        const { files } = await FileRepository.find(
            { model:'Service', referenceId:service._id },
            "-model -referenceId -__v",//fields
        )
        servicesFull.push({ ...service._doc, files })
    }

    return { erros:false, message:"Todos serviço(s) do salão.", salonId, services:servicesFull }
}

/*** AWS ***
 * @Info  Formdata: esta rota nao usa json.
 * @param {*} service 
 * @param {*} req 
 * @returns 
 */
const post = async ( service, files, headers )=>{
    console.log('Service::post AWS')    
    // let busboy      = Busboy({ headers })
    
    // busboy.on('pipe', async () => {
        //SALVAR NA AWS:
        const { files:AWSFiles } = await AWS.pushSafe(service, files)
        console.log('AWSFiles...',AWSFiles )

        //SAVAR NO DB:
        const { service:DBService, files:DBFiles } = await ServiceRepository.saveFull(service, AWSFiles)
        if( !DBService || !DBFiles ){ return { error:true, message:"Error ao salvar no DB."} }

        return { error:false, service:DBService, files:DBFiles }
    // })
    // req.pipe(busboy)
}

/*** AWS ***
 * @Info  Formdata: esta rota nao usa json.
 * @param {*} id serviceId
 * @param {*} service {...}
 * @param {*} req 
 * @returns 
 */
const put = async (id, service, files, headers)=>{
    console.log('Service::put AWS', id )
    // let busboy = Busboy({ headers })
    
    // busboy.on('finish', async ()=>{
        //PUBLICAR ARQUIVOS NA AWS:
        const { error:AWSError, files:AWSfiles } = await AWS.pushSafe(service, files)

        //UPDATE SERVICO:
        const { 
            error, 
            message, 
            service:DBservice, 
            files:DBFiles 
        } = await ServiceRepository.updateFull(id, service, AWSfiles)
        if( error||!DBservice||!DBFiles ){ return { error:true, message, files:null } }

        return { error:false, service:DBservice, files:DBFiles }
    // })
    // req.pipe(busboy)        
}/** */

/*** AULA ***
 * 
 * @param {*} id 
 * @param {*} referenceId 
 * @param {*} salonId 
 * @param {*} path 
 * @returns 
 */
const deleteFile = async (id, referenceId, salonId, path)=>{
    console.log('Service::deleteFile AWS', id, referenceId, salonId, path)

    //BUSCAR SALAO:
    const { salon } = await SalonRepository.findById(salonId, '_id name')
    if( !salon ){ return { error:true, message:'Erro, o salão não existe.', delete:false } }
    
    // const { service } = await ServiceRepository.findById(referenceId)    
    // if( !service ){ return { error:true, message:'Erro, o serviço não existe.', delete:false } }

    //DELETAR ARQUIVO:
    const { oldFile } = await FileRepository.deleteOne({ _id:id, referenceId, path })
    if( !oldFile ){ return { error:true, message:'Erro, o arquivo não existe.', delete:false } }
    
    //DELETAR ARQUIVO NA AWS:
    const { file } = await AWS.deleteFile(path)
    if( !file ){ resp = { error:true, message:'Arquivo deletado no DB. Erro, ao deletar da AWS!', delete:undefined } }
    
    return { error:false, message:'Arquivo deletado com sucesso.', delete:true }
}

/*** AULA ***
 * 
 * @param {*} id 
 * @param {*} referenceId 
 * @param {*} salonId 
 * @param {*} path 
 * @returns 
 */
const deleteFileById = async (id, referenceId, salonId, path)=>{    
    console.log('Service::deleteAwsFileById AWS', id, referenceId, salonId, path)

    //BUSCAR SALAO:
    const { salon } = await SalonRepository.findById(salonId,'_id name')
    if( !salon ) return { error:true, message:'Erro, o salão não existe.', salon }

    // const { service } = await ServiceRepository.findById(referenceId)    
    // if( !service ){ return { error:true, message:'Erro, o serviço não existe.', delete:false } })
    
    //DELETAR ARQUIVO:
    const { oldFile } = await FileRepository.deleteById(id)//{ status: 'e' })
    if( !!oldFile ){ resp = { error:false, message:'Arquivo deletado com sucesso.', delete:true } }
    
    //DELETAR ARQUIVO NA AWS:
    const { file } = await AWS.deleteFile(path)
    if( !file ){ resp = { error:true, message:'Arquivo deletado no DB. Erro, ao deletar da AWS!', delete:undefined } }

    return { error:false, message:'Arquivo deletado com sucesso.', delete:true }
}


module.exports = {

    getFullSalonServices,
    post,
    put,
    deleteFile,
    deleteFileById,

}