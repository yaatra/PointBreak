import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import user from './user'
import events from './events'
import categories from './categories'
import languages from './languages'

import similarUsers from './socialConnection'

import location from './selectedLocation'
import locations from './selectedAndAddedLocation'
import {composeWithDevTools} from 'redux-devtools-extension'

const reducer = combineReducers({user, events, categories, languages, locations, location, similarUsers})

const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger({collapsed: true})))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './events'
export * from './categories'
export * from './languages'
export * from './selectedLocation'
export * from './selectedAndAddedLocation'
export * from './socialConnection'
