/**
 * @SCHEDULLING_REPOSITORY
*/

const mongoose      = require('mongoose')

const ClientModel       = require('../models/client.model')
const SalonModel        = require('../models/salon.model')
const ServiceModel      = require('../models/service.model')
const CollaboratorModel = require('../models/collaborator.model')

const SchedulingModel = require('../models/scheduling.model')


const find = async (query, fields='', populate='') => {
    try {
        const schedules = await SchedulingModel.find(query)
                                    .select(fields)
                                    .populate(populate)
        return { error:false, schedules }
    } catch (error) {
        return { error:true, message:error.message, schedules:[] }
    }
}

const findById = async (id, fields='') => {
    
}

/**
 * 
 * @param {*} files 
 * @returns 
 */
 const findOne = async (query, fields='') => {
    try {
        const oldScheduling = await SchedulingModel.findOne(query).select(fields)
        return { error:false, oldScheduling }  
    } catch (error) {
        return { error:true, message:error.message, oldScheduling:null }  
    }
}

/**
 * 
 * @param {*} clientId 
 * @param {*} salonId 
 * @param {*} collaboratorId 
 * @param {*} serviceId 
 * @returns found{cl,sa,co,se}
 */
const findFull = async (clientId, salonId, collaboratorId, serviceId)=>{
    console.log('Schedulling::findFull',clientId, salonId, collaboratorId, serviceId)
    // const db = mongoose.connection
    // const session = await db.startSession()
    // session.startTransaction()
    try {
        //BUSCAR CLIENT:
        const client = await ClientModel.findById(clientId).select('name address customerId') 

        //BUSCAR SALAO:
        const salon = await SalonModel.findById(salonId).select('recipientId') 

        //BUSCAR SERVICO:
        const service = await ServiceModel.findById(serviceId).select('price title commission') 

        //BUSCAR COLABORADOR:
        const collaborator = await CollaboratorModel.findById(collaboratorId).select('recipientId') 

        // await session.commitTransaction()
        // session.endSession()
        return { error:false, found:{ client, salon, service, collaborator } }  
    } catch (error) {
        // await session.commitTransaction()
        // session.endSession()
        return { error:true, message:error.message, found:{} }  
    }
}

/**
 * 
 * @param {*} query 
 * @returns 
 */
 const save = async (query={})=>{
    try {
        const newScheduling = await SchedulingModel(query).save()        
        return { error:false,  newScheduling }
    } catch (error) {
        return { error:true, message:error.message, newScheduling:null }  
    }
 }
/**
 * 
 * @param {*} id 
 * @param {*} query 
 * @returns 
 */
const findByIdAndUpdate = async (id, query) => {
    try {
        const oldScheduling = await SchedulingModel.findByIdAndUpdate(id, query)
        console.log('oldScheduling', oldScheduling)
        return { error:false, oldClient }  
    } catch (error) {
        return { error:true, message:error.message, oldScheduling:null }  
    }
}


const update = async () => {
    
}


const del = async () => {
    
}


module.exports = { 

    find,
    findById,
    findOne,
    findFull,
    save,
    findByIdAndUpdate,
    // update,
    del
    
}