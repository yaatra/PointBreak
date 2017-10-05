import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {loadEventsData} from '../store'

/**
 * COMPONENT
 */
export class UserEventMgmt extends Component {
  componentDidMount(){
    this.props.getAllUserData(this.props.user.id)
  }

  render () {
    const {user, events} = this.props

    const createdEvents = []
    if (events !== undefined) {
      events.forEach(event => {
        if (event.type === 'created') createdEvents.push(event)
      })
    }

    return (
      <div>
        Event Management Console
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
    events: state.events.eventsForUser
  }
}
const mapDispatch = (dispatch) => {
  return {
    getAllUserData (userId) {
      // dispatch(loadUserData(userId))
      dispatch(loadEventsData(userId))
    }
  }
}
export default connect(mapState, mapDispatch)(UserEventMgmt)

/**
 * PROP TYPES
 */
UserEventMgmt.propTypes = {
  user: PropTypes.object,
  events: PropTypes.object
}
