import { 
    // API
    ALL_SERVICE,
    ADD_SERVICE,
    UPDATE_SERVICE,
    UNLINK_SERVICE,
    DELETEFILE_SERVICE,

    // STATE LOCAL
    REFRESH_SERVICE,
    RESET_SERVICE,
} from '../../../constants/store/actionTypes'



/**
 * @API
*/
const allService = () =>{
    // console.log('ACTIONS allService', )
    return {
        type:ALL_SERVICE 
    }
}

const addService = () =>{
    // console.log('ACTIONS allService', )
    return {
        type:ADD_SERVICE 
    }
}

const updateService = () =>{
    // console.log('ACTIONS refreshService', payload)
    return { 
        type:UPDATE_SERVICE,
    }
}

const unlinkService = () =>{
    console.log('ACTIONS unlinkService', )
    return {
        type:UNLINK_SERVICE 
    }
}

const deleteFileService = (payload) =>{
    console.log('ACTIONS deleteFileService', )
    return {
        type:DELETEFILE_SERVICE,
        payload 
    }
}


/**
 * @STATE_LOCAL
*/
const refreshService = (payload) =>{
    // console.log('ACTIONS refreshService', payload)
    return { 
        type:REFRESH_SERVICE, 
        payload,
    }
}

const resetService = () =>{
    // console.log('ACTIONS allService', )
    return {
        type:RESET_SERVICE 
    }
}


export {

    // API
    allService,
    addService,
    updateService,
    unlinkService,
    deleteFileService,

    // STATE LOCAL
    refreshService,
    resetService,

}