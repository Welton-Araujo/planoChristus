/**
 * @SCHEDULLING_REPOSITORY
*/

const SchedulingModel = require('../models/scheduling.model')


const find = async (query, fields='') => {
    
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
 * @param {*} query 
 * @returns 
 */
const save = async (query)=>{
    try {
        const newScheduling = await SchedulingModel(query).save()//{ session })
        return { error:false, newScheduling }  
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

    // find,
    // findById,
    findOne,
    save,
    findByIdAndUpdate,
    // update,
    // del
    
}