import { 
    // SCHEDULING_ALL,
    SCHEDULING_FILTER,
    SCHEDULING_UPDATE, 
} from '../actionTypes'


const filterScheduling = (payload) =>{
    // console.log('filterScheduling', payload,  )
    return{ type:SCHEDULING_FILTER, payload }
}

const updateScheduling = ( payload ) =>{
    // console.log('updateScheduling', payload,  )
    return{ type:SCHEDULING_UPDATE, payload }
}

export {

    filterScheduling,
    updateScheduling

}