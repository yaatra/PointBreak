import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import UserDetails from './userDetails'
import {loadUserData} from '../store'
import {EventsList, SocialConnection} from './'

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
    const createdEvents = []
    if (user.events !== undefined) {
      user.events.forEach(event => {
        if (event.associatedEvent.type === 'selected') selectedEvents.push(event)
        if (event.associatedEvent.type === 'followed') followingEvents.push(event)
        if (event.associatedEvent.type === 'created') createdEvents.push(event)
      })
    }
    return (
      <div className='container'>
        <UserDetails user={user} />
        <SocialConnection />
        {followingEvents.length ? <EventsList events={followingEvents} heading="Following Events" /> : null}
        {selectedEvents.length ? <EventsList events={selectedEvents} heading="Selected Events"  /> : null}
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
