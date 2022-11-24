import produce from 'immer'
import { 
    REFRESH_CLIENT,
    RESET_CLIENT,
} from '../../../constants/store/actionTypes'

import { INITIAL_STATE } from '../../../constants/store/client'


const client = (state=INITIAL_STATE, action) => {
    // console.log('REDUCER CLIENT', state, action)
    switch (action.type) {
        case REFRESH_CLIENT:
            return produce(state, (draft)=>{
                draft = { ...draft, ...action.payload }
                return draft
            })
        case RESET_CLIENT:
            return produce(state, (draft)=>{
                draft.current = INITIAL_STATE.current 
                return draft
            })            
        default:
            return state
    }
}

export default client