/**
 * @SALON_COLLABORATOR_REPOSITORY
 * @RELATIONSHIP 
*/

const SalonCollaboratorModel = require('../../models/relationship/salonCollaborator.model')


const find = async () => {
    
}

const findById = async (id, fields='') => {    
    try {
       const salonCollaborator = await SalonCollaboratorModel.findById({ _id:id }).select(fields)
       return { error:false, salonCollaborator }
   } catch (error) {
       return { error:true, message:error.message, salonCollaborator:null }
   }
}

/**
 * 
 * @param {*} files 
 * @returns 
 */
 const findOne = async (query) => {
    try {
        const oldCollaborator = await SalonCollaboratorModel.findOne(query)
        return { error:false, oldCollaborator }  
    } catch (error) {
        return { error:true, message:error.message, oldCollaborator:null }  
    }
}

/**
 * 
 * @param {*} query 
 * @returns 
 */
const save = async (query)=>{
    try {
        const newSalonCollaborator = await SalonCollaboratorModel(query).save()//{ session })
        return { error:false, newSalonCollaborator }  
    } catch (error) {
        return { error:true, message:error.message, newSalonCollaborator:null }  
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
        const upSalonCollaborator = await SalonCollaboratorModel.findByIdAndUpdate(id, query)
        return { error:false, upSalonCollaborator }  
    } catch (error) {
        return { error:true, message:error.message, upSalonCollaborator:null }  
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
    save,
    findByIdAndUpdate,
    // update,
    // del
    
}