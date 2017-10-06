import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {loadOtherUserData, fetchEventsForUser} from '../store'
import {EventsList} from './'


class OtherUserProfile extends Component {
  componentDidMount(){
    this.props.getAllUserData(+this.props.match.params.id)
  }
  render(){
    
    if (this.props.user){
    const {user, events} = this.props
    const eventsForUser = events.map(e => {  return e.event })
    //.filter(el=> el !== undefined)
    const followingEventsHeading = `${user.firstName} likes these events`
    return (<div className="container">
      <h4>{user.firstName} {user.lastName}</h4>
      <hr />
      <div className="thumbnail col-sm-3">
      <img src={user.avatar || user.image} className="img-responsive" />
        e-mail: {user.email}<hr />
      </div>
      <div className = "col-sm-9">
        <b>height:</b> {user.height} ft<br />
        <b>weight:</b> {user.weight} lbs<br />
        <b>BMI:</b> {user.bmi}
      </div>
      <div className = "row">
        <div className = "col-sm-12">
        {eventsForUser.length ? <EventsList events={eventsForUser} heading={followingEventsHeading} /> : null}
        </div>
      </div>      
    </div>)
  } else { return null }
}
}

const MapState = (state) => {
  return {
      user: state.user.otherUser,
      similarUsers: state.similarUsers,
      events: state.events.eventsForUser
  }
}

const MapDispatch = (dispatch) => {
  return {
    getAllUserData(userId){
      dispatch(loadOtherUserData(userId))
      dispatch(fetchEventsForUser(userId))
    }
  }
}
export default connect(MapState, MapDispatch)(OtherUserProfile)

OtherUserProfile.propTypes = {
  similarUsers: PropTypes.array
}
