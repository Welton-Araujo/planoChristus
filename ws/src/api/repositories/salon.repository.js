/**
 * @SALON_REPOSITORY
*/

const SalonModel = require('../models/salon.model')


/**
 * 
 * @param {*} query Obj { fields, ... }
 * @param {*} fields String 'fields ...'
 * @returns 
 */
const find = async ( query={}, fields='' ) => {
    try {
        const salons = await SalonModel.find(query).select(fields)
        return { error:false, salons }
    } catch (error) {
        return { error:true, message:error.message, salons:[] }
    }
}

/**
 * 
 * @param {*} id 
 * @param {*} fields Campos de pesquisa (geo.coordinates incluidas automaticamento pelo repository).
 * @returns 
 */
const findById = async (id, fields='') => {    
     try {
        const salon = await SalonModel.findById({ _id:id }).select(`${fields} geo.coordinates`)
        return { error:false, salon }
    } catch (error) {
        return { error:true, message:error.message, salon:null }
    }
}

/**
 * 
 * @param {*} newSalon 
 * @returns 
 */
const save = async (newSalon) => {
    try {
        const salon = await SalonModel(newSalon).save()
        return { error:false, salon }
    } catch (error) {
        return { error:true, message:error.message }
    }
}

/**
 * 
 * @param {*} id 
 * @param {*} salon 
 * @returns 
 */
const findByIdAndUpdate = async (id, salon) => {
    try {
        const upSalon = await SalonModel.findByIdAndUpdate(id, salon)
        return { error:false, upSalon }
    } catch (error) {
        return { error:true, message:error.message, upSalon:null }        
    }
}

/**
 * 
 * @param {*} id 
 * @param {*} email 
 * @param {*} passwd 
 * @returns 
 */
const deleteById = async ( id, fields='' ) => {
    try {
        const oldSalon = await SalonModel.findByIdAndRemove({ _id:id }).select(fields)
        console.log('deleteid....',oldSalon)
        return { error:false, oldSalon }
    } catch (error) {
        return { error:true, message:error.message, oldSalon:null }        
    }
}


module.exports = { 

    find,
    findById,
    save,
    findByIdAndUpdate,
    deleteById

}