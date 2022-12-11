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
    const { service } = req.body
    const { files, headers } = req
    const response = await serviceService.put(id, JSON.parse(service), files, headers)
    res.json(response)
}

/*** AULA File ***/
const deleteFile = async (req, res)=>{
    console.log('ServiceController::deleteFile')
    const { serviceId } = req.params
    const { salonId, id, path } = req.body
    const response = await serviceService.deleteFile(salonId, { id, referenceId:serviceId, path })
    res.json(response)
}

/*** AULA File ***/
const deleteById = async (req, res)=>{
    const { serviceId } = req.params
    const { salonId } = req.body
    console.log('ServiceController::deleteById', serviceId, salonId)
    const response = await serviceService.deleteById(serviceId, salonId)
    res.json(response)
}


module.exports = {
    
    getFullSalonServices,
    post,
    put,
    deleteFile,
    deleteById,    

}