import { 
    createStore, 
    applyMiddleware 
} from 'redux'

import  createSagaMiddleware  from 'redux-saga'
import { composeWithDevTools } from '@redux-devtools/extension'

import rootReducer from './rootReducer'
import rootSaga from './rootSaga'


//CREATE MIDDLEWARE:
const sagaMiddleware = createSagaMiddleware()
//APPLY  MIDDLEWARE:
const DEVTOOLS_OK = (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
const sagaMW      = DEVTOOLS_OK ? composeWithDevTools(applyMiddleware(sagaMiddleware))
                                : applyMiddleware(sagaMiddleware)

//CREATE STORE:
const store = createStore(rootReducer, sagaMW)
//RUN MIDDLEWARE:
sagaMiddleware.run(rootSaga)

export default store