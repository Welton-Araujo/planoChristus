import { 
    // API
    ALL_SCHEDULE,
    ADD_SCHEDULE,
    FILTER_SCHEDULE,
    UPDATE_SCHEDULE,
    UNLINK_SCHEDULE,
    ALLSERVICES_SCHEDULE,

    // STATE LOCAL
    REFRESH_SCHEDULE,
    RESET_SCHEDULE,
} from '../../../constants/store/actionTypes'



/**
 * @API
*/
const allSchedule = () =>{
    // console.log('ACTIONS allSchedule', )
    return {
        type:ALL_SCHEDULE 
    }
}

const addSchedule = () =>{
    // console.log('ACTIONS allSchedule', )
    return {
        type:ADD_SCHEDULE 
    }
}

//NAO ESTA USANDO O PAYLOAD: PQ ESTA USANDO O useSelect()
const filterSchedule = () =>{
    // console.log('ACTIONS filterSchedule', payload,  )
    return {
        type:FILTER_SCHEDULE,
    }
}

const updateSchedule = () =>{
    // console.log('ACTIONS refreshSchedule', payload)
    return { 
        type:UPDATE_SCHEDULE,
    }
}

const unlinkSchedule = () =>{
    console.log('ACTIONS unlinkSchedule', )
    return {
        type:UNLINK_SCHEDULE 
    }
}

const allServicesSchedule = () =>{
    console.log('ACTIONS unlinkSchedule', )
    return {
        type: ALLSERVICES_SCHEDULE
    }
}

/**
 * @STATE_LOCAL
*/
const refreshSchedule = (payload) =>{
    // console.log('ACTIONS refreshSchedule', payload)
    return { 
        type:REFRESH_SCHEDULE, 
        payload,
    }
}

const resetSchedule = () =>{
    // console.log('ACTIONS allSchedule', )
    return {
        type:RESET_SCHEDULE 
    }
}


export {

    // API
    allSchedule,
    addSchedule,
    filterSchedule,
    updateSchedule,
    unlinkSchedule,
    allServicesSchedule,

    // STATE LOCAL
    refreshSchedule,
    resetSchedule,

}