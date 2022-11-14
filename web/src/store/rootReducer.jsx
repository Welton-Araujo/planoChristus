import { combineReducers } from 'redux'

import client from './modules/client/reducers'
import scheduling from './modules/scheduling/reducers'

export default combineReducers({
    client,
    scheduling,
})