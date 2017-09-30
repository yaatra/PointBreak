import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import UserDetails from './userDetails'
import {loadUserData} from '../store'

/**
 * COMPONENT
 */
export class UserHome extends Component {
  componentDidMount(){
    this.props.getAllUserData(this.props.user.id)
  }

  render () {
    const {user} = this.props

    const selectedEvents = []
    const followingEvents = []
    if (user.events !== undefined) {
      user.events.forEach(event => {
        (event.addociatedEvent.type === 'selected') ? selectedEvents.push(event) : followingEvents.push(event)
      })
      console.log('selectedEvents: ', selectedEvents)
      console.log('followedEvents: ', followingEvents)
    }
    return (
      <div>
        <UserDetails user={user} />
        {/* <RenderEvent followingEvent={followingEvents} /> */}
        {/* <RenderEvent selectedEvents={selectedEvents} /> */}
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
    email: state.user.email
  }
}
const mapDispatch = (dispatch) => {
  return {
    getAllUserData (userId) {
      dispatch(loadUserData(userId))
    }
  }
}
export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  user: PropTypes.object,
  email: PropTypes.string
}
