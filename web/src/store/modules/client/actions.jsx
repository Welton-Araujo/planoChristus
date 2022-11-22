import { 
    ALL_CLIENT,
    ADD_CLIENT,
    FILTER_CLIENTS,
    UPDATE_CLIENT,
    RESET_CLIENT,
    UNLINK_CLIENT,
} from '../../../constants/store/actionTypes'


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
        type:FILTER_CLIENTS, 
    }
}

const updateClient = (payload) =>{
    // console.log('ACTIONS updateClient', payload)
    return { 
        type:UPDATE_CLIENT, 
        payload,
    }
}

const resetClient = () =>{
    // console.log('ACTIONS allClient', )
    return {
        type:RESET_CLIENT 
    }
}

const unlinkClient = () =>{
    console.log('ACTIONS unlinkClient', )
    return {
        type:UNLINK_CLIENT 
    }
}


export {

    allClient,
    addClient,
    filterClient,
    updateClient,
    resetClient,
    unlinkClient,

}