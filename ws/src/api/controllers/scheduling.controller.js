const schedulingService = require('../services/scheduling.service')


/**  **
 *
*/
const get = async (req, res)=>{
    console.log('schedulingController::get')
    const { fields, ...query } = req.query// = { fields, param_1, param_2, ... }
    const response = await schedulingService.get(fields, query)
    res.json(response)
}

/**  **
 * 
 *
const getSalonSchedules = async (req, res)=>{
    console.log('schedulingController::getSalonSchedules')
    const { salonId } = req.params
    const { fields, ...query } = req.query
    const response = await schedulingService.getSalonSchedules(salonId, fields, query)
    res.json(response)
}

/**  **
 *
*
const getById = async (req, res)=>{
    console.log('schedulingController::getById', req.params)
    const { id } = req.params
    const response = await schedulingService.getById(id)
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

/**  **
 *
*
const postCollaboratorSchedules = async (req, res)=>{
    console.log('schedulingController::postCollaboratorSchedules')
    const { services } = req.body
    const response = await schedulingService.postCollaboratorSchedules(services)
    res.json(response)
}

/**  **
const put = async (req, res)=>{
    console.log('schedulingController::put')
    const { id } = req.params
    const { fields } = req.query
    const response = await schedulingService.put(id, req.body, fields )
    res.json(response)
}

const deleteById = async (req, res)=>{
    console.log('schedulingController::delete')
    const id = req.params.id
    const { email, passwd } = req.body
    const response = await schedulingService.deleteById(id, email, passwd)
    res.json(response)
}

const getScheduleFormattedServices = async (req, res)=>{
    console.log('schedulingController::getScheduleFormattedServices', req.params)
    const { sheduleId } = req.params
    const response = await schedulingService.getScheduleFormattedServices(sheduleId)
    res.json(response)
}/** */

/**AULA **/
const filters = async (req, res)=>{
    console.log('schedulingController::filters', req.body)   
    const { filtro, ...query } = req.query
    const { salonId, period  } = req.body
    const response = await schedulingService.filters(salonId, period, query, filtro)
    res.json(response)
}


module.exports = {
    
    get,
    // getSalonSchedules,
    // getById,
    post,
    // postCollaboratorSchedules,
    // put,
    // deleteById,
    // getScheduleFormattedServices,
    filters
}