/**
 * @COLLABORATOR_REPOSITORY
*/

const CollaboratorModel = require('../models/collaborator.model')


const find = async ( query={}, fields='', populate='' ) => {
    try {
        const collaborators = await CollaboratorModel.find(query)
                                        .select(fields)
                                        .populate(populate)
        return { error:false, collaborators }
    } catch (error) {
        return { error:true, message:error.message, collaborators:[] }
    }
}

const findById = async (id, fields='') => {    
    try {
       const collaborator = await CollaboratorModel.findById({ _id:id }).select(fields)
       return { error:false, collaborator }
   } catch (error) {
       return { error:true, message:error.message, collaborator:null }
   }
}

/**
 * 
 * @param {*} query 
 * @returns 
 */
const findOne = async (query) => {
    try {
        const oldCollaborator = await CollaboratorModel.findOne(query)
        return { error:false, oldCollaborator }  
    } catch (error) {
        return { error:true, message:error.message, oldCollaborator:null }  
    }
}

/**
 * 
 * @param {*} files 
 * @returns 
 */
const save = async (query) => {
    try {
        const newCollaborator = await CollaboratorModel(query).save()//{ session })
        return { error:false, newCollaborator }  
    } catch (error) {
        return { error:true, message:error.message, newCollaborator:null }
    }
}

const findByIdAndUpdate = async (id, collaborator) => {    
    try {
       const upCollaborator = await CollaboratorModel.findByIdAndUpdate(id, collaborator)
       return { error:false, upCollaborator }
   } catch (error) {
       return { error:true, message:error.message, upCollaborator:null }
   }
}

const deleteById = async () => {
    
}

/**
 * @ATENCAO REMOVER: EH IGUAL AO: find(query)
 *          o find(query).select() eh bem mas dinamico!
 * @param {*} filters 
 * @returns 
 */
const filters = async (filters={}) => {
    try {
        const collaborators = await CollaboratorModel.find(filters) 
        return { error:false, collaborators }
    } catch (error) {
        return { error:true, message:error.message, collaborators:null }
    }
}


module.exports = { 
    
    find,
    findById,
    findOne,
    save,
    // update,
    findByIdAndUpdate,
    deleteById,
    filters,
    
}