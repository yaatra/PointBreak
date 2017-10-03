import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import user from './user'
import events from './event'
import location from './selectedLocation'
import {composeWithDevTools} from 'redux-devtools-extension'

const reducer = combineReducers({user, events, location})
const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger({collapsed: true})))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './event'
export * from './selectedLocation'
