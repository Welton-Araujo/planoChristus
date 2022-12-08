/**
 * @FILE_REPOSITORY
 */

const FileModel = require('../models/file.model')


/**
 * 
 * @param {*} query { field_0, ... }
 * @returns Jobj { error, file }
 */
const find = async (query={}, fields='', populate='' ) => {
    try {
        const files = await FileModel.find(query)
                                .select(fields)
                                .populate(populate)
        return { error:false, files }
    } catch (error) {
        return { error:true, message:error.message, files:[] }
    }
}

/**
 * 
 * @param {*} id
 * @returns 
*/
const findById = async (id, fields='') => {    
    try {
        const file = await FileModel.findById({ _id:id }).select(fields)
        return { erros: false, file }
    } catch (error) {
        return { error: true, message: error.message }
    }
}

/**
 * 
 * @param {*} query { filed_0, ... }
 * @returns Obj { erro, oldFile }
 */
const deleteOne = async (query)=>{
    try {
        //Excluir mongodb
        const oldFile = await FileModel.findOneAndDelete(query)
        return { error:false, oldFile }
    } catch (error) {
        return { error:true, message:error.message, oldFile:null }
    }
}

/**
 * 
 * @param {*} id fileId
 * @returns Obj { erro, oldFile }
 */
const deleteById = async ( id )=>{
    console.log('FileRepository::del', id )
    try {
        //Excluir mongodb
        const oldFile = await FileModel.findByIdAndRemove(id)
        return { error:false, oldFile }
    } catch (error) {
        return { error:true, message: error.message, oldFile:null }
    }
}

module.exports = {

    find,
    findById,
    deleteOne,
    deleteById,

}