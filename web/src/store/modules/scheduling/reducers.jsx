import produce from 'immer'

import { UPDATE_SCHEDULING } from '../../../constants/store/actionTypes'
import { INITIAL_STATE } from '../../../constants/store/scheduling'


const scheduling = (state=INITIAL_STATE, action) =>{
    // console.log('REDUCER scheduling', state, action)
    switch (action.type) {
        case UPDATE_SCHEDULING:
            return produce(state, (draft)=>{
                // draft = { ...draft, ...action.payload }
                draft.payload = action.payload
                return draft
            })
        default:
            return state
    }
}

export default scheduling