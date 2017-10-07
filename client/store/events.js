import axios from "axios"
import history from "../history"

const GET_EVENT = "GET_EVENT"
const GET_YELP_EVENT = "GET_YELP_EVENT"
const JOIN_EVENT = "JOIN_EVENT"
const FOLLOW_EVENT = "FOLLOW_EVENT"
const GET_EVENTS = "GET_EVENTS"
const GET_EVENTS_BY_LOCATION = "GET_EVENTS_BY_LOCATION"
const GET_EVENTS_FOR_USER = "GET_EVENTS_FOR_USER"
const DELETE_EVENT = "DELETE_EVENT"
const CREATE_EVENT = "CREATE_EVENT"

const events = {
    singleEvent: {},
    singleYelpEvent: {},
    pendingJoinEvent: {},
    followedEvent: {},
    allEvents: [],
    eventsByLocation: [],
    eventsForUser: []
}

const getEvent = event => ({ type: GET_EVENT, event })
const getYelpEvent = event => ({ type: GET_YELP_EVENT, event })
const attendEvent = event => ({ type: JOIN_EVENT, event })
const traceEvent = event => ({ type: FOLLOW_EVENT, event })
const getEvents = events => ({ type: GET_EVENTS, events })
const getEventsByLocation = eventsByLocation => ({ type: GET_EVENTS_BY_LOCATION, eventsByLocation })
const getEventsForUser = eventsForUser => ({ type: GET_EVENTS_FOR_USER, eventsForUser })
const deleteEvent = eventId => ({type: DELETE_EVENT, eventId})
// const createEvent = createdEvent => ({type: CREATE_EVENT, createdEvent})

export const fetchEvent = id => dispatch => {
  return axios
    .get(`/api/events/${id}`)
    .then(res => res.data)
    .then(event => dispatch(getEvent(event)))
    .catch(err => console.log(err))
}

export const fetchYelpEvent = id => dispatch => {
  return axios
    .get(`/api/yelp/${id}`)
    .then(res => res.data)
    .then(event => dispatch(getYelpEvent(event)))
    .catch(err => console.log(err))
}

export const joinEvent = (type, userId, eventId) => dispatch => {
  return axios
    .post("/api/events/join", {type, userId, eventId})
    .then(res => res.data)
    .then(event => dispatch(attendEvent(event)))
    .catch(err => console.log(err))
}

export const followEvent = (type, userId, eventId) => dispatch => {
  return axios
    .post("/api/events/follow", {type, userId, eventId})
    .then(res => res.data)
    .then(event => dispatch(traceEvent(event)))
    .catch(err => console.log(err))
}

export const fetchEvents = () => dispatch => {
    return axios
        .get("/api/events")
        .then(res => res.data)
        .then(events => dispatch(getEvents(events)))
        .catch(err => console.log(err))
}

export const fetchEventsByLocation = (location) => dispatch => {
    return axios
        .get("/api/events/locations", {params: location})
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

export const createEventThunk = (event, userId) => dispatch => {
    return axios
    .post(`/api/events/${userId}`, event)
    .then(res => res.data)
    .then(createdEvent => {
        // dispatch(createEvent(createdEvent))
        history.push('/manageEvents')
    })
    .catch(err => console.log(err))
}

export default function (state = events, action){
    switch (action.type){
        case GET_EVENT:
            return Object.assign({}, state, {singleEvent: action.event})
        case GET_YELP_EVENT:
            return Object.assign({}, state, {singleYelpEvent: action.event})
        case JOIN_EVENT:
            return Object.assign({}, state, {pendingJoinEvent: action.event})
        case FOLLOW_EVENT:
            return Object.assign({}, state, {followedEvent: action.event})
        case GET_EVENTS:
            return Object.assign({}, state, {allEvents: action.events})
        case GET_EVENTS_BY_LOCATION:
            return Object.assign({}, state, {eventsByLocation: action.eventsByLocation})
        case GET_EVENTS_FOR_USER:
            return Object.assign({}, state, {eventsForUser: action.eventsForUser})
        case DELETE_EVENT:
            console.log('inside reducer: ', action.eventId)
            return Object.assign({}, state, {eventsForUser: state.eventsForUser.filter(event => event.eventId !== action.eventId)})
        // case CREATE_EVENT:
        //     console.log('inside reducer: ', action.createdEvent)
        //     return Object.assign({}, state, {eventsForUser: [...state.eventsForUser, action.createdEvent]})
        default:
            return state
    }
}
