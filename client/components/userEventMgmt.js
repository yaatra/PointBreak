import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchEventsForUser} from '../store'

/**
 * COMPONENT
 */
export class UserEventMgmt extends Component {
  componentDidMount(){
    console.log('******* userId: ', +this.props.user.id)
    this.props.loadUserEvents(+this.props.user.id)
  }

  render () {
    const {eventsForUser} = this.props
    console.log('**** EVENTS FOR USER: ', eventsForUser)
    const createdEvents = []
    if (eventsForUser !== undefined) {
      console.log('**** EVENTS FOR USER: ', eventsForUser)
      eventsForUser.forEach(event => {
        if (event.type === 'created') createdEvents.push(event)
      })
    }

    return (
      <div>
        Event Management Console
        {createdEvents.map(event => <p key={event.event.id}>{event.event.name}</p>) }
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.user,
    eventsForUser: state.events.eventsForUser
  }
}
const mapDispatch = (dispatch) => {
  return {
    loadUserEvents (userId) {
      // dispatch(loadUserData(userId))
      dispatch(fetchEventsForUser(userId))
    }
  }
}
export default connect(mapState, mapDispatch)(UserEventMgmt)

/**
 * PROP TYPES
 */
UserEventMgmt.propTypes = {
  user: PropTypes.object,
  eventsForUser: PropTypes.array
}
