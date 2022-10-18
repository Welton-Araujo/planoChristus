const collaboratorService = require('../services/collaborator.service')


/** AULA **/
const get = async (req, res)=>{
    console.log('CollaboratorController::get')
    const { filtro, ...query } = req.query
    const response = await collaboratorService.get( query, filtro )
    res.json(response)
}

/** AULA **/
const getById = async (req, res)=>{
    console.log('CollaboratorController::getById')
    const { salonId } = req.params
    const { filtro  } = req.query
    const response = await collaboratorService.getById( salonId, filtro )
    res.json(response)
}

/** AULA **/
const post = async (req, res)=>{
    console.log('CollaboratorController::post')
    const { salonId, collaborator, services } = req.body
    const response = await collaboratorService.post( salonId, collaborator, services )
    res.json(response)
}

/**AULA **/
const put = async (req, res)=>{
    console.log('CollaboratorController::put')   
    const { collaboratorId } = req.params
    const { status, bondId:salColId , services } = req.body
    const response = await collaboratorService.put( collaboratorId, status, salColId , services )
    res.json(response)
}

/**AULA **/
const deleteById = async (req, res)=>{
    console.log('CollaboratorController::deleteById')   
    const { id } = req.params
    const response = await collaboratorService.deleteById(id)
    res.json(response)
}

/**AULA **/
const filters = async (req, res)=>{
    console.log('CollaboratorController::filters', req.body)   
    const response = await collaboratorService.filters(req.body)
    res.json(response)
}



module.exports = {
    
    get,
    getById,
    post,
    put,
    deleteById,
    filters

}