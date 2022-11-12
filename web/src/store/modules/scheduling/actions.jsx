import { 
    // SCHEDULING_ALL,
    SCHEDULING_FILTER,
    SCHEDULING_UPDATE, 
} from '../actionTypes'


const filterScheduling = (start, end) =>{
    return{
        type: SCHEDULING_FILTER,
        start,
        end
    }
}

const updateScheduling = ( schedules ) =>{
    return{
        type: SCHEDULING_UPDATE,
        schedules
    }
}

export {

    filterScheduling,
    updateScheduling

}