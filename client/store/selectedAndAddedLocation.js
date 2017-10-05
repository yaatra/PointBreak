/**
 * ACTION TYPES
 */
const ADD_LOCATION = 'ADD_LOCATION'

/**
 * INITIAL STATE
 */
const locations = []

/**
 * ACTION CREATORS
 */
export const addSelectedAndAddedLocation = location => ({type: ADD_LOCATION, location})

/*
 * REDUCER
 */
export default function (state = locations, action) {
  switch (action.type) {
    case ADD_LOCATION:
      const newLocations = locations
      newLocations.push(action.location[0])
      return newLocations
    default:
      return state
  }
}
