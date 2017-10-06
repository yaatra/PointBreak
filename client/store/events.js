import axios from "axios"
import history from "../history"

const GET_EVENTS = "GET_EVENTS"
const GET_EVENTS_BY_LOCATION = "GET_EVENTS_BY_LOCATION"

const events = {
    allEvents: [],
    eventsByLocation: []
}

const getEvents = events => ({ type: GET_EVENTS, events })
const getEventsByLocation = eventsByLocation => ({ type: GET_EVENTS_BY_LOCATION, eventsByLocation })

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

export default function (state = events, action){
    switch (action.type){
        case GET_EVENTS:
            return Object.assign({}, state, {allEvents: action.events})
        case GET_EVENTS_BY_LOCATION:
            return Object.assign({}, state, {eventsByLocation: action.eventsByLocation})
        default:
            return state
    }
}
