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

      return (
        <section className="clearfix bg-dark profileSection">
        <div className="container">

          <div className="row">
            <div className="col-md-4 col-sm-5 col-xs-12">
              <div className="dashboardBoxBg mb30">

                <div className="profileImage">
                  <img src={user.avatar || user.image} className="img-responsive" />
                </div>
                <div className="profileUserInfo bt profileName">
                  <h3>{user.firstName} {user.lastName}</h3>
                  <p>e-mail: {user.email}</p>
                </div>

              </div>
            </div>


            <div className="col-md-8 col-sm-7 col-xs-12">
              <div className="dashboardBoxBg">
                <div className="profileIntro">
                  <b>height:</b> {user.height} ft<br />
                  <b>weight:</b> {user.weight} lbs<br />
                  <b>BMI:</b> {user.bmi}
                </div>
              </div>
            </div>
          </div>

          {eventsForUser.length ? <EventsList events={eventsForUser} heading={followingEventsHeading} fromUser="true" type="userHome" /> : null}

        </div>
      </section>
    )} else { return null }
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
