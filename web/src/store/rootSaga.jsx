import { all } from 'redux-saga/effects'

import collaborator from './modules/collaborator/sagas'
import client       from './modules/client/sagas'
import scheduling   from './modules/scheduling/sagas'

//generation function: Similar ao async:await
export default function* rootSaga(){
    return yield all([
        collaborator,
        client,
        scheduling,
    ])
}