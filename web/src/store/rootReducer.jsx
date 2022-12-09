import { combineReducers } from 'redux'

import service      from './modules/service/reducers'
import collaborator from './modules/collaborator/reducers'
import client       from './modules/client/reducers'
import scheduling   from './modules/scheduling/reducers'

export default combineReducers({
    service,
    collaborator,
    client,
    scheduling,
})