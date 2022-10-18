const serviceService = require('../services/service.service')



/*** AULA ***/
const getFullSalonServices = async (req, res)=>{
    console.log('ServiceController::getFullSalonServices', req.params)
    const { filtro, ...query } = req.query
    const { salonId } = req.params
    const response = await serviceService.getFullSalonServices(salonId, query, filtro)
    res.json(response)
}

/*** AWS ***/
const post = async (req, res)=>{
    console.log('ServiceController::post (Multidata)')
    const { service } = req.body
    const { files, headers } = req
    const response = await serviceService.post( JSON.parse(service), files, headers)
    res.json(response)
}

/*** AWS ***/
const put = async (req, res)=>{
    console.log('ServiceController::put (Multidata)')
    const { id } = req.params
    const { salonId, service } = req.body
    const { files, headers } = req
    const response = await serviceService.put(id, JSON.parse(service), files, headers)
    res.json(response)
}

/*** AULA File ***/
const deleteFile = async (req, res)=>{
    console.log('ServiceController::deleteFile')
    const { referenceId } = req.params
    const { id, salonId, path } = req.body
    const response = await serviceService.deleteFile(id, referenceId, salonId, path)
    res.json(response)
}

/*** AULA File ***/
const deleteFileById = async (req, res)=>{
    console.log('ServiceController::delFileById')
    const { id } = req.params
    const { referenceId, salonId, path } = req.body
    const response = await serviceService.deleteFileById(id, referenceId, salonId, path)
    res.json(response)
}


module.exports = {
    
    getFullSalonServices,
    post,
    put,
    deleteFile,
    deleteFileById,    

}