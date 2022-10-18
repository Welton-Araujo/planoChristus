/**
 * @SALON_CLIENT_REPOSITORY
 * @RELATIONSHIP
*/

const SalonClientModel = require('../../models/relationship/salonClient.model')


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
        const oldSalonClient = await SalonClientModel.findOne(query)
        return { error:false, oldSalonClient }  
    } catch (error) {
        return { error:true, message:error.message, oldSalonClient:null }  
    }
}

/**
 * 
 * @param {*} query 
 * @returns 
 */
 const save = async (query)=>{
    try {
        const newSalonClient = await SalonClientModel(query).save()//{ session })
        return { error:false, newSalonClient }  
    } catch (error) {
        return { error:true, message:error.message, newSalonClient:null }  
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
        const upSalonClient = await SalonClientModel.findByIdAndUpdate(id, query)
        return { error:false, upSalonClient }  
    } catch (error) {
        return { error:true, message:error.message, upSalonClient:null }  
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