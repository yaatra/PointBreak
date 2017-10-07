import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import UserDetails from './userDetails'
import {loadUserData, fetchEventsForUser, getFitbitDataThunk} from '../store'
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
    const fitbitinfoId = this.props.user.fitbitInfoId
    console.log('****** Fitbit ID: ', fitbitinfoId)
    this.props.getAllUserData(userID, fitbitinfoId)
  }

  componentWillReceiveProps(nextProps){
    nextProps.events.forEach(e => {
          if(e.type === 'selected') this.setState({ selectedEvents: [...this.state.selectedEvents, e.event] })
          if(e.type === 'followed') this.setState({ followingEvents: [...this.state.followingEvents, e.event] })
    })
  }

  render () {
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
    events: state.events.eventsForUser,
    fitbitinfoId: state.user.fitbitInfoId
  }
}
const mapDispatch = (dispatch) => {
  return {
    getAllUserData(userId, fitbitinfoId) {
      dispatch(loadUserData(userId))
      dispatch(getFitbitDataThunk(fitbitinfoId))
      dispatch(fetchEventsForUser(userId))
    }
  }
}
export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  user: PropTypes.object,
  events: PropTypes.array,
  fitbitinfoId: PropTypes.number
}
