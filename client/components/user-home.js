import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import UserDetails from './userDetails'
import {loadUserData, fetchEventsForUser} from '../store'
import {EventsList, SocialConnection} from './'

/**
 * COMPONENT
 */
export class UserHome extends Component {
  constructor(props){
    super(props)
    this.state = {
      events: [],
      selectedEvents: [],
      followingEvents: [] 
    }
  }
  componentDidMount(){
    const userID = this.props.user.id
    this.props.getAllUserData(userID)
  }

  // componentWillReceiveProps(nextProps){
  //   //console.log("NEXT PROPS", nextProps)
  //   this.setState({ events: nextProps.events })
  //   // nextProps.events.forEach(e => {
  //   //       if(e.event.type === 'selected') this.setState({ selectedEvents: [...this.state.selectedEvents, e.event] })
  //   //       if(e.event.type === 'followed') this.setState({ followingEvents: [...this.state.followingEvents, e.event] })
  //   // })
  // }

  render () {
    //const {user, event} = this.props
    // console.log('**** USER *****', user)
    console.log(this.props)

    if (this.props.events.length && this.props.user) {
      let selectedEvents = this.props.events.map(e => {
        if(e.type === 'selected') return e.event
      }).filter(el => el !== undefined)
      let followingEvents = this.props.events.map(e => {
        if(e.type === 'followed') return e.event
      }).filter(el => el !== undefined)
      console.log(selectedEvents)
    return (
      <div className='container'>
        <UserDetails user={this.props.user} />
        <SocialConnection />
        {followingEvents.length ? <EventsList events={followingEvents} heading="Following Events" /> : null}
        {selectedEvents.length ? <EventsList events={selectedEvents} heading="Selected Events"  /> : null}
      </div>
    )
  } else {
    return null
  }
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
    getAllUserData(userId) {
      dispatch(loadUserData(userId))
      dispatch(fetchEventsForUser(userId))
    },
  }
}
export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  user: PropTypes.object,
}
