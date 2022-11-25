import { combineReducers } from 'redux'

import collaborator from './modules/collaborator/reducers'
import client       from './modules/client/reducers'
import scheduling   from './modules/scheduling/reducers'

export default combineReducers({
    collaborator,
    client,
    scheduling,
})