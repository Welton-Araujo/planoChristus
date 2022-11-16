import produce from 'immer'
import { 
    UPDATE_CLIENT
} from '../../../constants/store/actionTypes'

import { INITIAL_STATE } from '../../../constants/store/client'


const client = (state=INITIAL_STATE, action) => {
    // console.log('REDUCER CLIENT', state, action)
    switch (action.type) {
        case UPDATE_CLIENT:
            return produce(state, (draft)=>{
                draft = { ...draft, ...action.payload }
                return draft
            })
        default:
            return state
    }
}

export default client