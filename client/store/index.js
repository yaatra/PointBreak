import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import user from './user'
import events from './event'
import categories from './categories'
import languages from './languages'
import location from './selectedLocation'
import locations from './selectedAndAddedLocation'
import {composeWithDevTools} from 'redux-devtools-extension'

const reducer = combineReducers({user, events, categories, languages, locations, location})
const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger({collapsed: true})))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './event'
export * from './categories'
export * from './languages'
export * from './selectedLocation'
export * from './selectedAndAddedLocation'
