import produce from 'immer'

import { SCHEDULING_UPDATE } from '../actionTypes'

const INITIAL_STATE = {
    schedules:[]
}


const scheduling = (state = INITIAL_STATE, action) =>{
    // console.log('REDEUCER', state)
    switch (action.type) {
        case SCHEDULING_UPDATE:
            const resp = produce(state, (draft)=>{
                draft.schedules = action.schedules
            })
            // console.log('SAGA ... sched', resp)
            return resp
        default:
            return state
    }
}

export default scheduling