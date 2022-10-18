/**
 * @COLLABORATOR_SERVICE_REPOSITORY
 * @RELATIONSHIP
*/

const CollaboratorServiceModel = require('../../models/relationship/collaboratorService.model')


const find = async () => {
    
}

const findById = async () => {
    
}

/**
 * 
 * @param {*} query
 * @returns 
 */
const findOne = async (query) => {
    try {
        const oldCollaboratorService = await CollaboratorServiceModel.findOne(query)
        return { error:false, oldCollaboratorService }  
    } catch (error) {
        return { error:true, message:error.message, oldCollaboratorService:null }  
    }
}

/**
 * 
 * @param {*} query 
 * @returns 
 */
const save = async (query)=>{
    try {
        const newCollaboratorService = await CollaboratorServiceModel(query).save()//{ session })
        return { error:false, newCollaboratorService }  
    } catch (error) {
        return { error:true, message:error.message, newCollaboratorService:null }  
    }
}
/**
 * 
 * @param {*} query 
 * @returns 
 */
const insertMany = async (query) => {
    try {
        const newCollaboratorServices = await CollaboratorServiceModel.insertMany(query)
        return { error:false, newCollaboratorServices }  
    } catch (error) {
        return { error:true, message:error.message, newCollaboratorServices:null }  
    }
}

const findByIdAndUpdate = async (id, collaboratorService) => {
    try {
        const upCollaboratorServices = await CollaboratorServiceModel.findByIdAndUpdate(id, collaboratorService)
        return { error:false, upCollaboratorServices }  
    } catch (error) {
        return { error:true, message:error.message, upCollaboratorServices:null }  
    }
}

/**
 * 
 * @param {*} query 
 * @returns 
 */
const deleteMany = async (query) => {
    try {
        const delCollaboratorService = await CollaboratorServiceModel.deleteMany(query)
        console.log('delllll', delCollaboratorService)
        return { error:false, delCollaboratorService }  
    } catch (error) {
        return { error:true, message:error.message, delCollaboratorService:null }  
    }
}


module.exports = { 

    // find,
    // findById,
    findOne,
    save,
    insertMany,
    // update,
    findByIdAndUpdate,
    deleteMany,
    
}