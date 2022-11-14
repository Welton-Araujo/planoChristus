import produce from 'immer'
import { 
    CLIENT_UPDATE
} from '../actionTypes'


const INITIAL_STATE = {
    payload: []
}

const client = (state=INITIAL_STATE, action) => {
    // console.log('REDUCER CLIENT', state)
    switch (action.type) {
        case CLIENT_UPDATE:
            return produce(state, (draft)=>{
                // draft.payload = [ ...draft.payload, ...action.payload ]
                draft.payload = action.payload 
                // return draft
            })
        default:
            return state
    }
}

export default client