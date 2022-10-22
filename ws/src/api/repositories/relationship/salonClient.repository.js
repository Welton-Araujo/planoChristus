/**
 * @SALON_CLIENT_REPOSITORY
 * @RELATIONSHIP
*/

const SalonClientModel = require('../../models/relationship/salonClient.model')


/**
 * 
 * @param {*} query 
 * @param {*} fields 
 * @param {*} populate { path, select }
 * @returns 
 */
 const find = async ( query={}, fields='', populate='' ) => {
    console.log('SalonClientModel::find ...', fields, populate)
    try {
        const salonClients = await SalonClientModel.find(query)
                                            .select(fields)
                                            .populate(populate)
        return { error:false, salonClients }
    } catch (error) {
        return { error:true, message:error.message, salonClients:[] }
    }
}

const findById = async (id, fields='') => {    
    try {
       const salonClient = await SalonClientModel.findById({ _id:id }).select(fields)
       return { error:false, salonClient }
   } catch (error) {
       return { error:true, message:error.message, salonClient:null }
   }    
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
 * @param {*} query 
 * @returns 
 */
 const insertMany = async (query) => {
    try {
        const newSalonClients = await SalonClientModel.insertMany(query)
        return { error:false, newSalonClients }  
    } catch (error) {
        return { error:true, message:error.message, newSalonClients:null }  
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


/**
 * 
 * @param {*} query 
 * @returns 
 */
 const deleteMany = async (query) => {
    try {
        const delSalonClients = await SalonClientModel.deleteMany(query)
        console.log('delllll', delSalonClients)
        return { error:false, delSalonClients }
    } catch (error) {
        return { error:true, message:error.message, delSalonClients:null }  
    }
}


module.exports = { 

    find,
    findById,
    findOne,
    save,
    insertMany,
    findByIdAndUpdate,
    // update,
    deleteMany
    
}