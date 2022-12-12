import produce from 'immer'
import { 
    REFRESH_SCHEDULE,
    RESET_SCHEDULE,
} from '../../../constants/store/actionTypes'

import { INITIAL_STATE } from '../../../constants/store/schedule'


const schedule = (state=INITIAL_STATE, action) => {
    // console.log('REDUCER SCHEDULE', state, action)
    switch (action.type) {
        case REFRESH_SCHEDULE:
            return produce(state, (draft)=>{
                draft = { ...draft, ...action.payload }
                return draft
            })
        case RESET_SCHEDULE:
            return produce(state, (draft)=>{
                draft.current = INITIAL_STATE.current 
                return draft
            })            
        default:
            return state
    }
}

export default schedule