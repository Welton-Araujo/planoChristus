import { 
    // ALL_SCHEDULING,
    FILTER_SCHEDULING,
    UPDATE_SCHEDULING, 
} from '../actionTypes'


const filterScheduling = (payload) =>{
    // console.log('filterScheduling', payload,  )
    return{ type:FILTER_SCHEDULING, payload }
}

const updateScheduling = ( payload ) =>{
    // console.log('updateScheduling', payload,  )
    return{ type:UPDATE_SCHEDULING, payload }
}

export {

    filterScheduling,
    updateScheduling

}