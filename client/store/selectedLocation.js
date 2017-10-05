/**
 * ACTION TYPES
 */
const SET_LOCATION = 'SET_LOCATION'

/**
 * INITIAL STATE
 */
const location = {}

/**
 * ACTION CREATORS
 */
export const setSelectedLocation = location => ({type: SET_LOCATION, location})

/**
 * REDUCER
 */
export default function (state = location, action) {
  switch (action.type) {
    case SET_LOCATION:
      return action.location
    default:
      return state
  }
}
