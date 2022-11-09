import { all } from 'redux-saga/effects'

import scheduling from './modules/scheduling/sagas'

//generation function: Similar ao async:await
export default function* rootSaga(){
    return yield all([
        scheduling,
    ])
}