const sheduleService = require('../services/schedule.service')


/**
 * @Schedule
*/
const get = async (req, res)=>{
    console.log('ScheduleController::getAll')
    const { fields, ...query } = req.query// = { fields, param_1, param_2, ... }
    const response = await sheduleService.get(fields, query)
    res.json(response)
}

const getById = async (req, res)=>{
    console.log('ScheduleController::getById', req.params)
    const { id } = req.params
    const response = await sheduleService.getById(id)
    res.json(response)
}

const post = async (req, res)=>{
    console.log('ScheduleController::post')
    const response = await sheduleService.post(req.body)
    res.json(response)
}

const put = async (req, res)=>{
    console.log('ScheduleController::put')
    const response = await sheduleService.put(req.params.id, req.body)
    res.json(response)
}

const deleteById = async (req, res)=>{
    console.log('ScheduleController::delete')
    const id = req.params.id
    const { email, passwd } = req.body
    const response = await sheduleService.deleteById(id, email, passwd)
    res.json(response)
}

const getScheduleFormattedServices = async (req, res)=>{
    console.log('ScheduleController::getScheduleFormattedServices', req.params)
    const { sheduleId } = req.params
    const response = await sheduleService.getScheduleFormattedServices(sheduleId)
    res.json(response)
}

module.exports = {
    
    get,
    getById,
    post,
    put,
    deleteById,
    getScheduleFormattedServices,

}