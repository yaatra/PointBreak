import axios from "axios"
import history from "../history"

const GET_CATEGORIES = "GET_CATEGORIES"

const categories = []

const getCategories = categories => ({ type: GET_CATEGORIES, categories })

export const fetchCategories = () => dispatch => {
  return axios
    .get("/api/categories")
    .then(res => res.data)
    .then(categories => dispatch(getCategories(categories)))
    .catch(err => console.log(err))
}


export default function (state = categories, action) {
    switch (action.type){
        case GET_CATEGORIES:
            return action.categories
        default:
            return state
    }
}
