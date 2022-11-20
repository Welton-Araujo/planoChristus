import { combineReducers } from 'redux'

import CLIENT from './modules/client/reducers'
import SCHEDULING from './modules/scheduling/reducers'

export default combineReducers({
    CLIENT,
    SCHEDULING,
})