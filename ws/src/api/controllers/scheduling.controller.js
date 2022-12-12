const schedulingService = require('../services/scheduling.service')


/**  **
 *
*/
const get = async (req, res)=>{
    console.log('schedulingController::get')
    const { filtro, ...query } = req.query// = { filtro, param_1, param_2, ... }
    const response = await schedulingService.get(query, filtro)
    res.json(response)
}

/** AULA **
 *
*/
const post = async (req, res)=>{
    console.log('schedulingController::post')
    const { clientId, salonId, collaboratorId, serviceId, date } = req.body
    const response = await schedulingService.post(clientId, salonId, collaboratorId, serviceId, date)
    res.json(response)
}

/**AULA **/
const filters = async (req, res)=>{
    console.log('schedulingController::filters', req.body)   
    const { filtro, ...query } = req.query
    const { salonId, period  } = req.body
    const response = await schedulingService.filters(salonId, period, query, filtro)
    res.json(response)
}

/*** AULA ***/
const availableDays = async (req, res) =>{
    console.log('schedulingController::availableDays')   
    const { filtro, ...query } = req.query
    const { salonId, serviceId, date  } = req.body
    const response = await schedulingService.availableDays(salonId, serviceId, date, query, filtro)
    res.json(response)
}


module.exports = {
    
    get,
    post,
    filters,
    availableDays,
}