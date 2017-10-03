import axios from "axios"
import history from "../history"

const GET_LANGUAGES = "GET_LANGUAGES"

const languages = []

const getLanguages = languages => ({ type: GET_LANGUAGES, languages })

export const fetchLanguages = () => dispatch => {
  return axios
    .get("/api/languages")
    .then(res => res.data)
    .then(languages => dispatch(getLanguages(languages)))
    .catch(err => console.log(err))
}


export default function (state = languages, action){
    switch (action.type){
        case GET_LANGUAGES:
            return action.languages
        default:
            return state
    }
}
