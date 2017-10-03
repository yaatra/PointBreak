
/**
 * ACTION TYPES
 */
const SET_LOCATION = 'SET_LOCATION'


/**
 * INITIAL STATE
 */
const defaultLocation = {}

/**
 * ACTION CREATORS
 */
export const setSelectedLocation = location => ({type: SET_LOCATION, location})


/**
 * REDUCER
 */
export default function (state = defaultLocation, action) {
  switch (action.type) {
    case SET_LOCATION:
      return action.location
    default:
      return state
  }
}
