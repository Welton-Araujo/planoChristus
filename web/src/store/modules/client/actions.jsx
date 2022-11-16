import { 
    ALL_CLIENT,
    FILTER_CLIENTS,
    UPDATE_CLIENT,
} from '../../../constants/store/actionTypes'


const allClient = () =>{
    // console.log('ACTIONS allClient', )
    return {
        type:ALL_CLIENT 
    }
}

const filterClient = (payload) =>{
    // console.log('ACTIONS filterClient', payload,  )
    return {
        type:FILTER_CLIENTS, 
        // payload 
    }
}

const updateClient = (payload) =>{
    // console.log('ACTIONS updateClient', payload)
    return { 
        type:UPDATE_CLIENT, 
        payload,
    }
}


export {

    allClient,
    filterClient,
    updateClient,

}