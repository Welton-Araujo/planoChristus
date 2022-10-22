const clientService = require('../services/client.service')


/** AULA **/
const get = async (req, res)=>{
    console.log('ClientController::get')
    const { filtro, ...query } = req.query
    const response = await clientService.get( query, filtro )
    res.json(response)
}

/** AULA **/
const getSalonClients = async (req, res)=>{
    console.log('ClientController::getById')
    const { salonId } = req.params
    const { filtro  } = req.query
    const response = await clientService.getSalonClients( salonId, filtro )
    res.json(response)
}

/** AULA **/
const post = async (req, res)=>{
    console.log('ClientController::post')
    const { salonId, client, services } = req.body
    const response = await clientService.post( salonId, client, services )
    res.json(response)
}

/**AULA **/
const put = async (req, res)=>{
    console.log('ClientController::put')   
    const { clientId } = req.params
    const { status, bondId:salColId , services } = req.body
    const response = await clientService.put( clientId, status, salColId , services )
    res.json(response)
}

/**AULA **/
const deleteById = async (req, res)=>{
    console.log('ClientController::deleteById')   
    const { id } = req.params
    const response = await clientService.deleteById(id)
    res.json(response)
}

/**AULA **/
const filters = async (req, res)=>{
    console.log('ClientController::filters', req.body)   
    const response = await clientService.filters(req.body)
    res.json(response)
}



module.exports = {
    
    get,
    // getById,
    getSalonClients,
    post,
    put,
    deleteById,
    filters

}