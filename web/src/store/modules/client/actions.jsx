import { 
    // API
    ALL_CLIENT,
    ADD_CLIENT,
    FILTER_CLIENT,
    UPDATE_CLIENT,
    UNLINK_CLIENT,

    // STATE LOCAL
    REFRESH_CLIENT,
    RESET_CLIENT,
} from '../../../constants/store/actionTypes'



/**
 * @API
*/
const allClient = () =>{
    // console.log('ACTIONS allClient', )
    return {
        type:ALL_CLIENT 
    }
}

const addClient = () =>{
    // console.log('ACTIONS allClient', )
    return {
        type:ADD_CLIENT 
    }
}

//NAO ESTA USANDO O PAYLOAD: PQ ESTA USANDO O useSelect()
const filterClient = () =>{
    // console.log('ACTIONS filterClient', payload,  )
    return {
        type:FILTER_CLIENT,
    }
}

const updateClient = () =>{
    // console.log('ACTIONS refreshClient', payload)
    return { 
        type:UPDATE_CLIENT,
    }
}

const unlinkClient = () =>{
    console.log('ACTIONS unlinkClient', )
    return {
        type:UNLINK_CLIENT 
    }
}


/**
 * @STATE_LOCAL
*/
const refreshClient = (payload) =>{
    // console.log('ACTIONS refreshClient', payload)
    return { 
        type:REFRESH_CLIENT, 
        payload,
    }
}

const resetClient = () =>{
    // console.log('ACTIONS allClient', )
    return {
        type:RESET_CLIENT 
    }
}


export {

    // API
    allClient,
    addClient,
    filterClient,
    updateClient,
    unlinkClient,

    // STATE LOCAL
    refreshClient,
    resetClient,

}