import { all } from 'redux-saga/effects'

import service      from './modules/service/sagas'
import collaborator from './modules/collaborator/sagas'
import client       from './modules/client/sagas'
import scheduling   from './modules/scheduling/sagas'

//generation function: Similar ao async:await
export default function* rootSaga(){
    return yield all([
        service,
        collaborator,
        client,
        scheduling,
    ])
}