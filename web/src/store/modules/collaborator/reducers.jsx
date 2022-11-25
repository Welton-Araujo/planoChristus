import produce from 'immer'
import { 
    REFRESH_COLLABORATOR,
    RESET_COLLABORATOR,
} from '../../../constants/store/actionTypes'

import { INITIAL_STATE } from '../../../constants/store/collaborator'


const collaborator = (state=INITIAL_STATE, action) => {
    // console.log('REDUCER COLLABORATOR', state, action)
    switch (action.type) {
        case REFRESH_COLLABORATOR:
            return produce(state, (draft)=>{
                draft = { ...draft, ...action.payload }
                return draft
            })
        case RESET_COLLABORATOR:
            return produce(state, (draft)=>{
                draft.current = INITIAL_STATE.current 
                return draft
            })            
        default:
            return state
    }
}

export default collaborator