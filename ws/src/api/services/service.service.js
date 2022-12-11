const Busboy  = require('busboy')

const AWS = require('../../utils/external/aws')
const { 
    createMetadata:createMeta,
    saveImg,
} = require ('../../utils/operations/image')
const { UPLOAD_DIR } = require('../../config')

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
            "-model -__v",//fields
        )
        // console.log("FILE ###", files)
        servicesFull.push({
            ...service._doc, 
            // files
            files: files.map((file, i)=>({
                id:file._id,
                referenceId:file.referenceId, 
                name:file.path, 
                fileKey:i+1, 
                url:file.path,
                // path:file.path, 
                meta:file.meta,
                dataRegistration:file.dataRegistration, 
            })) 
        })
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
    console.log('Service::post AWS', )    
    // let busboy      = Busboy({ headers })
    
    // busboy.on('pipe', async () => {
        //SALVAR NA AWS:
        const { files:AWSFiles } = await AWS.pushSafe(service, files)

        //ADD METADATA:
        const AWSFilesMeta = []
        for await (const obj of AWSFiles) {
            AWSFilesMeta.push({...obj, meta:createMeta(obj.file)})
        }
        // console.log('AWSFilesMeta...', AWSFilesMeta )

        //SAVAR NO DB:
        const { 
            error, 
            message,
            service:DBService, 
            files:DBFiles 
        } = await ServiceRepository.saveFull(service, AWSFilesMeta)
        console.log("Service::post: saveFull ### error:", error, message)
        if( !DBService || !DBFiles ){ return { error:true, message:"Error ao salvar no DB." } }

        //SALVAR ARQUIVO FISICAMENTE:
        const fileErros = []
        for await (const obj of AWSFilesMeta) { 
            const error = saveImg(obj.file, UPLOAD_DIR).then(resp=>resp.error).catch(e=>e.error) 
            fileErros.push(error)    
        }
        if( fileErros.includes(true) ){ return { error:true, message:"Error ao salvar arquivo(s) de imagem(ns)." } }

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
        const { files:AWSFiles } = await AWS.pushSafe(service, files)

        //ADD METADATA:
        const AWSFilesMeta = []
        for await (const obj of AWSFiles) {
            AWSFilesMeta.push({...obj, meta:createMeta(obj.file)})
        }

        //UPDATE SERVICO:
        const { 
            error, 
            message, 
            service:DBservice, 
            files:DBFiles 
        } = await ServiceRepository.updateFull(id, service, AWSFilesMeta)
        console.log("Service::post: updateFull ### error:", error, message)
        if( error||!DBservice||!DBFiles ){ return { error:true, message, files:null } }

        return { error:false, service:DBservice, files:DBFiles }
    // })
    // req.pipe(busboy)        
}

/*** AULA ***
 * 
 * @param {*} id 
 * @param {*} referenceId 
 * @param {*} salonId 
 * @param {*} path 
 * @returns 
 */
const deleteFile = async ( salonId, { id, referenceId, path })=>{
    console.log('Service::deleteFile AWS', salonId, {id, referenceId, path})

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
const deleteById = async (id, salonId)=>{    
    console.log('Service::deleteById', id, salonId)

    //BUSCAR SALAO:
    // const { salon } = await SalonRepository.findById(salonId,'_id name')
    // if( !salon ) return { error:true, message:'Erro, o salão não existe.', salon }

    //DELETAR SERVICO: STATUS E
    const { upService } = await ServiceRepository.findByIdAndUpdate(id,{ status:'e'})
    if( !upService ){ resp = { error:true, message:'Erro ao deletar o serviço.', delete:true } }

    return { error:false, message:'Arquivo deletado com sucesso.', delete:true }
}


module.exports = {

    getFullSalonServices,
    post,
    put,
    deleteFile,
    deleteById,

}