const Busboy  = require('busboy')

const AWS = require('../../utils/external/aws')
// const { isEmpty } = require('../../utils/validations')

const ServiceRepository = require('../repositories/service.repository')
const SalonRepository   = require('../repositories/salon.repository')
const FileRepository    = require('../repositories/file.repository')



/** AULA ById=salonId
 * @ServicesFull Obter os serviços (com arquivos) do salao.
 */
const getFullSalonServices = async (salonId, query={}, fields='')=>{
    console.log('Service::getFullSalonServices', salonId)
    
    try {
        let servicesFull = []
        //Buscando serviços...
        const { services } = await ServiceRepository.find({ 
            salonId,
            status: { $ne: 'E'},
            ...query
        }, fields)
        console.log('services...', services)
        //Atualizando servicesFull com os arquivos.
        for (const service of services) {
            const files = await FileRepository.find({
                model: 'Service',
                referenceId: service._id,
            })
            servicesFull.push({ ...service._doc, files })
        }
        return { erros: false, salonId, servicos: servicesFull }
    } catch (error) {
        return { error: true, message: error.message }
    }
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
        const { error:AWSError, files:AWSfiles } = await AWS.pushSafe(service, files)

        //UPDATE SERVIÇO:
        const {error, message, service:DBservice, files:DBFiles } = await ServiceRepository.updateFull(id, service, AWSfiles)
        if( error||!DBservice||!DBFiles ){ return { error:true, message } }

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

    //Verificar no mongodb
    const { salon } = await SalonRepository.findById(salonId, '_id name')
    if( !salon ){ return { error:true, message:'Erro, o salão não existe.', delete:false } }
    
    // const { service } = await ServiceRepository.findById(referenceId)    
    // if( !service ){ return { error:true, message:'Erro, o serviço não existe.', delete:false } }

    //Excluir mongodb
    const { oldFile } = await FileRepository.deleteOne({ _id:id, referenceId, path })
    if( !oldFile ){ return { error:true, message:'Erro, o arquivo não existe.', delete:false } }
    
    //Excluir AWS
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

    //Verificar no mongodb
    const { salon } = await SalonRepository.findById(salonId,'_id name')
    if( !salon ) return { error:true, message:'Erro, o salão não existe.', salon }

    // const { service } = await ServiceRepository.findById(referenceId)    
    // if( !service ){ return { error:true, message:'Erro, o serviço não existe.', delete:false } })
    
    //Excluir mongodb
    const { oldFile } = await FileRepository.deleteById(id)//{ status: 'E' })
    if( !!oldFile ){ resp = { error:false, message:'Arquivo deletado com sucesso.', delete:true } }
    
    //Excluir AWS
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