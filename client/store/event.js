import axios from "axios";
import history from "../history";

const GET_EVENTS = "GET_EVENTS";

const events = [];

const getEvents = events => ({ type: GET_EVENTS, events });

export const fetchEvents = () => dispatch => {
  return axios
    .get("/api/events")
    .then(res => res.data)
    .then(events => dispatch(getEvents(events)))
    .catch(err => console.log(err));
};

export default function (state = events, action){
    switch (action.type){
        case GET_EVENTS:
            return action.events
        default:
            return state
    }
}