import produce from 'immer'
import { 
    REFRESH_SERVICE,
    RESET_SERVICE,
} from '../../../constants/store/actionTypes'

import { INITIAL_STATE } from '../../../constants/store/service'


const service = (state=INITIAL_STATE, action) => {
    // console.log('REDUCER SERVICE', state, action)
    switch (action.type) {
        case REFRESH_SERVICE:
            return produce(state, (draft)=>{
                draft = { ...draft, ...action.payload }
                return draft
            })
        case RESET_SERVICE:
            return produce(state, (draft)=>{
                draft.current = INITIAL_STATE.current 
                return draft
            })            
        default:
            return state
    }
}

export default service