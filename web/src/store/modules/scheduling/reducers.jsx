import produce from 'immer'

import { UPDATE_SCHEDULING } from '../actionTypes'

const INITIAL_STATE = {
    payload:[]
}


const scheduling = (state=INITIAL_STATE, action) =>{
    // console.log('REDUCER scheduling', action)
    switch (action.type) {
        case UPDATE_SCHEDULING:
            return produce(state, (draft)=>{
                draft.payload = action.payload
                return draft
            })
        default:
            return state
    }
}

export default scheduling