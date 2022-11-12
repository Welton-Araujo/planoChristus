import {
    createStore,
    combineReducers,
    compose,
    applyMiddleware
} from 'redux'
import thunk from 'redux-thunk'

// import reducers from './rootReducer'

import schedulingReducer from './modules/scheduling/reducer'

const reducers = combineReducers({
    scheduling: schedulingReducer
})

const storeConfig = () => {
    return createStore(reducers, compose(applyMiddleware(thunk)))
}

export default storeConfig