const scheduleService = require('../services/schedule.service')


/** AULA **
 *
*/
const get = async (req, res)=>{
    console.log('ScheduleController::get')
    const { fields, ...query } = req.query// = { fields, param_1, param_2, ... }
    const response = await scheduleService.get(fields, query)
    res.json(response)
}

/** AULA **
 * 
 */
const getSalonSchedules = async (req, res)=>{
    console.log('ScheduleController::getSalonSchedules')
    const { salonId } = req.params
    const { fields, ...query } = req.query
    const response = await scheduleService.getSalonSchedules(salonId, fields, query)
    res.json(response)
}

/** AULA **
 *
*/
const getById = async (req, res)=>{
    console.log('ScheduleController::getById', req.params)
    const { id } = req.params
    const response = await scheduleService.getById(id)
    res.json(response)
}

/** AULA **
 *
*/
const post = async (req, res)=>{
    console.log('ScheduleController::post')
    const response = await scheduleService.post(req.body)
    res.json(response)
}

/** AULA **
 *
*/
const postCollaboratorSchedules = async (req, res)=>{
    console.log('ScheduleController::postCollaboratorSchedules')
    const { services } = req.body
    const response = await scheduleService.postCollaboratorSchedules(services)
    res.json(response)
}

/** AULA **/
const put = async (req, res)=>{
    console.log('ScheduleController::put')
    const { id } = req.params
    const { fields } = req.query
    const response = await scheduleService.put(id, req.body, fields )
    res.json(response)
}

const deleteById = async (req, res)=>{
    console.log('ScheduleController::delete')
    const id = req.params.id
    const { email, passwd } = req.body
    const response = await scheduleService.deleteById(id, email, passwd)
    res.json(response)
}

const getScheduleFormattedServices = async (req, res)=>{
    console.log('ScheduleController::getScheduleFormattedServices', req.params)
    const { sheduleId } = req.params
    const response = await scheduleService.getScheduleFormattedServices(sheduleId)
    res.json(response)
}

module.exports = {
    
    get,
    getSalonSchedules,
    getById,
    post,
    postCollaboratorSchedules,
    put,
    deleteById,
    getScheduleFormattedServices,

}