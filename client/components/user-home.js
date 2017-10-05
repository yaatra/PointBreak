import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import UserDetails from './userDetails'
import {loadUserData} from '../store'
import EventsList from './eventsList'

/**
 * COMPONENT
 */
export class UserHome extends Component {
  componentDidMount(){
    this.props.getAllUserData(this.props.user.id)
  }

  render () {
    const {user} = this.props
    // console.log('**** USER *****', user)

    const selectedEvents = []
    const followingEvents = []
    if (user.events !== undefined) {
      user.events.forEach(event => {
        (event.associatedEvent.type === 'selected') ? selectedEvents.push(event) : followingEvents.push(event)
      })
      console.log('selectedEvents: ', selectedEvents)
      console.log('followedEvents: ', followingEvents)
    }
    return (
      <div className='container'>
        <UserDetails user={user} />
        {followingEvents.length ? <EventsList events={followingEvents} heading="Following Events" /> : null}
        {selectedEvents.length ? <EventsList events={selectedEvents} heading="Selected Events" /> : null}
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
}
