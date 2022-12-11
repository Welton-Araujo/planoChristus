import { 
    // API
    ALL_COLLABORATOR,
    ADD_COLLABORATOR,
    FILTER_COLLABORATOR,
    UPDATE_COLLABORATOR,
    UNLINK_COLLABORATOR,
    ALLSERVICES_COLLABORATOR,

    // STATE LOCAL
    REFRESH_COLLABORATOR,
    RESET_COLLABORATOR,
} from '../../../constants/store/actionTypes'



/**
 * @API
*/
const allCollaborator = () =>{
    // console.log('ACTIONS allCollaborator', )
    return {
        type:ALL_COLLABORATOR 
    }
}

const addCollaborator = () =>{
    // console.log('ACTIONS allCollaborator', )
    return {
        type:ADD_COLLABORATOR 
    }
}

//NAO ESTA USANDO O PAYLOAD: PQ ESTA USANDO O useSelect()
const filterCollaborator = () =>{
    // console.log('ACTIONS filterCollaborator', payload,  )
    return {
        type:FILTER_COLLABORATOR,
    }
}

const updateCollaborator = () =>{
    // console.log('ACTIONS refreshCollaborator', payload)
    return { 
        type:UPDATE_COLLABORATOR,
    }
}

const unlinkCollaborator = () =>{
    console.log('ACTIONS unlinkCollaborator', )
    return {
        type:UNLINK_COLLABORATOR 
    }
}

const allServicesCollaborator = () =>{
    console.log('ACTIONS unlinkCollaborator', )
    return {
        type: ALLSERVICES_COLLABORATOR
    }
}

/**
 * @STATE_LOCAL
*/
const refreshCollaborator = (payload) =>{
    // console.log('ACTIONS refreshCollaborator', payload)
    return { 
        type:REFRESH_COLLABORATOR, 
        payload,
    }
}

const resetCollaborator = () =>{
    // console.log('ACTIONS allCollaborator', )
    return {
        type:RESET_COLLABORATOR 
    }
}


export {

    // API
    allCollaborator,
    addCollaborator,
    filterCollaborator,
    updateCollaborator,
    unlinkCollaborator,
    allServicesCollaborator,

    // STATE LOCAL
    refreshCollaborator,
    resetCollaborator,

}