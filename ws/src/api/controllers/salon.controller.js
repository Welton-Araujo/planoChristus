const { query } = require('express')
const salonService = require('../services/salon.service')


/**
 * 
 * @param {*} req req.query = { filtro, param_1, param_2, ... }
 * @param {*} res 
 */
const get = async (req, res)=>{
    console.log('SalonController::get')
    const { filtro, ...query } = req.query
    const response = await salonService.get(query, filtro)
    res.json(response)
}

const getById = async (req, res)=>{
    console.log('SalonController::getById')
    const { id } = req.params
    const {  filtro, lat, long } = req.query
    const response = await salonService.getById(id, [lat, long], filtro)
    res.json(response)
}

/*** AULA ***/
const post = async (req, res)=>{
    console.log('SalonController::post')
    const response = await salonService.post(req.body)
    res.json(response)
}

const put = async (req, res)=>{
    console.log('SalonController::put')
    const response = await salonService.put(req.params.id, req.body)
    res.json(response)
}

const deleteById = async (req, res)=>{
    console.log('SalonController::delete')
    const id = req.params.id
    const { email, passwd } = req.body
    const response = await salonService.deleteById(id, email, passwd)
    res.json(response)
}

/*** AULA ***
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getSalonFormattedServices = async (req, res)=>{
    console.log('SalonController::getSalonFormattedServices')
    const { salonId } = req.params
    const { filtro, ...query } = req.query
    const response = await salonService.getSalonFormattedServices(salonId, query, filtro)
    res.json(response)
}

module.exports = {
    
    get,
    getById,
    post,
    put,
    deleteById,
    getSalonFormattedServices,

}