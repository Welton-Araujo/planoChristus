/**
 * @CLIENT_REPOSITORY
*/

const ClientModel = require('../models/client.model')


const find = async () => {
    
}

const findById = async () => {
    
}

/**
 * 
 * @param {*} files 
 * @returns 
 */
 const findOne = async (query) => {
    try {
        const oldClient = await ClientModel.findOne(query)
        return { error:false, oldClient }  
    } catch (error) {
        return { error:true, message:error.message, oldClient:null }  
    }
}

/**
 * 
 * @param {*} query 
 * @returns 
 */
 const save = async (query)=>{
    try {
        const newClient = await ClientModel(query).save()//{ session })
        return { error:false, newClient }  
    } catch (error) {
        return { error:true, message:error.message, newClient:null }  
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
        const oldClient = await ClientModel.findByIdAndUpdate(id, query)
        console.log('oldClient', oldClient)
        return { error:false, oldClient }  
    } catch (error) {
        return { error:true, message:error.message, oldClient:null }  
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