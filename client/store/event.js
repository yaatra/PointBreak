import axios from "axios"
import history from "../history"

const GET_EVENTS = "GET_EVENTS"
const GET_EVENTS_BY_LOCATION = "GET_EVENTS_BY_LOCATION"
const GET_EVENTS_FOR_USER = "GET_EVENTS_FOR_USER"
const DELETE_EVENT = "DELETE_EVENT"
const CREATE_EVENT = "CREATE_EVENT"

const events = {
    allEvents: [],
    eventsByLocation: [],
    eventsForUser: []
}

const getEvents = events => ({ type: GET_EVENTS, events })
const getEventsByLocation = eventsByLocation => ({ type: GET_EVENTS_BY_LOCATION, eventsByLocation })
const getEventsForUser = eventsForUser => ({ type: GET_EVENTS_FOR_USER, eventsForUser })
const deleteEvent = eventId => ({type: DELETE_EVENT, eventId})
const createEvent = event => ({type: CREATE_EVENT, event})

export const fetchEvents = () => dispatch => {
    return axios
        .get("/api/events")
        .then(res => res.data)
        .then(events => dispatch(getEvents(events)))
        .catch(err => console.log(err))
}

export const fetchEventsByLocation = (location) => dispatch => {
    return axios
        .get("/api/events/locations/", {params: location})
        .then(res => res.data)
        .then(eventsByLocation => {
            dispatch(getEventsByLocation(eventsByLocation))
            history.push('/locations')
        })
        .catch(err => console.log(err))
}

export const fetchEventsForUser = (userId) => dispatch => {
    return axios
        .get(`/api/events/user/${userId}`)
        .then(res => res.data)
        .then(eventsForUser => dispatch(getEventsForUser(eventsForUser)))
        .catch(err => console.log(err))
}

export const deleteEventThunk = (eventId, userId) => dispatch => {
    return axios
    .delete(`/api/events/${eventId}/${userId}`)
    .then(res => res.data)
    .then(() => {
        dispatch(deleteEvent(eventId))
        history.push('/manageEvents')
    })
    .catch(err => console.log(err))
}

export const createEventThunk = (event) => dispatch => {
    return axios
    .post('/api/events', event)
    .then(res => res.data)
    .then(event => {
        dispatch(createEvent(event))
        history.push('/manageEvents')
    })
    .catch(err => console.log(err))
}

export default function (state = events, action){
    switch (action.type){
        case GET_EVENTS:
            return Object.assign({}, state, {allEvents: action.events})
        case GET_EVENTS_BY_LOCATION:
            return Object.assign({}, state, {eventsByLocation: action.eventsByLocation})
        case GET_EVENTS_FOR_USER:
            return Object.assign({}, state, {eventsForUser: action.eventsForUser})
        case DELETE_EVENT:
            console.log('inside reducer: ', action.eventId)
            return Object.assign({}, state, {eventsForUser: state.eventsForUser.filter(event => event.eventId !== action.eventId)})
        case CREATE_EVENT:
            return Object.assign({}, state, {eventsForUser: [...state.eventsForUser, ...action.eventsForUser]})
        default:
            return state
    }
}
