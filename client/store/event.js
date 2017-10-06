import axios from "axios"

const GET_EVENT = "GET_EVENT"
const GET_YELP_EVENT = "GET_YELP_EVENT"
const JOIN_EVENT = "JOIN_EVENT"
const FOLLOW_EVENT = "FOLLOW_EVENT"

const event = {
  singleEvent: {},
  singleYelpEvent: {},
  pendingJoinEvent: {},
  followedEvent: {}
}

const getEvent = event => ({ type: GET_EVENT, event })
const getYelpEvent = event => ({ type: GET_YELP_EVENT, event })
const attendEvent = event => ({ type: JOIN_EVENT, event })
const traceEvent = event => ({ type: FOLLOW_EVENT, event })

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

export default function (state = event, action){
    switch (action.type){
        case GET_EVENT:
            return Object.assign({}, state, {singleEvent: action.event})
        case GET_YELP_EVENT:
            return Object.assign({}, state, {singleYelpEvent: action.event})
        case JOIN_EVENT:
            return Object.assign({}, state, {pendingJoinEvent: action.event})
        case FOLLOW_EVENT:
            return Object.assign({}, state, {followedEvent: action.event})
        default:
            return state
    }
}
