import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const GET_USER_DATA = 'GET_USER_DATA'
const GET_OTHER_USER_DATA = 'GET_OTHER_USER_DATA'
const GET_FITBIT_DATA = 'GET_FITBIT_DATA'

/**
 * INITIAL STATE
 */
const user = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const getUserData = user => ({type: GET_USER_DATA, user})
const removeUser = () => ({type: REMOVE_USER})
const getOtherUserData = otherUser => ({type: GET_OTHER_USER_DATA, otherUser})
const getFitbitData = fitbitData => ({type: GET_FITBIT_DATA, fitbitData})

/**
 * THUNK CREATORS
 */
export const loadUserData = (userId) =>
dispatch =>
  axios.get(`/api/users/${userId}`)
    .then(res => res.data)
    .then(user =>
      dispatch(getUserData(user)))
    .catch(err => console.log(err))

export const loadOtherUserData = (userId) =>
  dispatch =>
    axios.get(`/api/users/${userId}`)
      .then(res =>
        dispatch(getOtherUserData(res.data)))
      .catch(err => console.log(err))

export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res =>
        dispatch(getUser(res.data || user)))
      .catch(err => console.log(err))

export const auth = (firstName, lastName, email, password, height, weight, age, gender, selectedLanguages, selectedCategories, selectedLocations, method) =>
  dispatch => {
    axios.post(`/auth/${method}`, { firstName, lastName, email, password, height, weight, age, gender, selectedLanguages, selectedCategories, selectedLocations })
    .then(res => {
      dispatch(getUser(res.data))
      history.push('/home')
    })
    .catch(error =>
      dispatch(getUser({error})))
  }

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(res => {
        dispatch(removeUser())
        history.push('/login')
      })
      .catch(err => console.log(err))

export const getFitbitDataThunk = (fitbitId) => dispatch =>
    axios.get(`api/users/fitbit/${fitbitId}`)
    .then(res => res.data)
    .then(fitbitData => dispatch(getFitbitData(fitbitData)))
    .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = user, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case GET_USER_DATA:
      return action.user
    case REMOVE_USER:
      return user
    case GET_FITBIT_DATA:
      return Object.assign({}, state, { fitbitInfo: action.fitbitData })
    case GET_OTHER_USER_DATA:
      return Object.assign({}, state, { otherUser: action.otherUser })
    default:
      return state
  }
}
