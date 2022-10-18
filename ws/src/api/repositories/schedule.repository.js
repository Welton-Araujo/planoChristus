/**
 * @SCHEDULE_REPOSITORY
*/

const ScheduleModel = require('../models/schedule.model')

/**
 * 
 * @param {*} query 
 * @returns 
 */
const find = async (query={}, fields='') => {
    try {
        const schedules = await ScheduleModel.find(query).select(fields)
        // console.log('schedules ...', schedules)
        return { error:false, schedules }
    } catch (error) {
        return { error:true, message:error.message, schedules:null }
    }
}

const findById = async (id) => {
    try {
        const schedule = await ScheduleModel.findById({ _id:id })
        return { error:false, schedule }
    } catch (error) {
        return { error:true, message:error.message, schedule:null }
    }
}

/**
 * 
 * @param {*} query 
 * @returns 
 */
const save = async (query) => {
    try {
        const newSchedule = await ScheduleModel(query).save() 
        return { error:false, newSchedule }
    } catch (error) {
        return { error:true, message:error.message, newSchedule:null }
    }
}


const findByIdAndUpdate = async (id, schedule) => {
    try {
        const oldSchedule = await ScheduleModel.findByIdAndUpdate(id, schedule)
        return { error:false, oldSchedule }
    } catch (error) {
        return { error:true, message:error.message, oldSchedule:null }
    }
}

const deleteById = async ( id, fields='' ) => {
    try {
        const oldSchedule = await ScheduleModel.findByIdAndRemove({ _id:id }).select(fields)
        console.log('deleteid....',oldSchedule)
        return { error:false, oldSchedule }
    } catch (error) {
        return { error:true, message:error.message, oldSchedule:null }        
    }
}



module.exports = { 

    find,
    findById,
    save,
    findByIdAndUpdate,
    deleteById
    
}