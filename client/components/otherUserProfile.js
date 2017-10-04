import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {EventsList} from './'

const OtherUserProfile = (props) => {
  const userId = +props.match.params.id
  const {similarUsers} = props
  const selecteduser = similarUsers.filter(users => (users[1].id === userId))
  const followingEventsHeading = `${selecteduser[0][1].firstName} likes these events`

  return (
    <div className = "container">
      <h4>{selecteduser[0][1].firstName} {selecteduser[0][1].lastName}</h4>
      <div className='thumbnail col-sm-3' key={userId}>
        <img src={selecteduser[0][1].avatar || selecteduser[0][1].image} className='img-responsive' />
        e-mail: {selecteduser[0][1].email}<br />
      </div>
      <div className = "col-sm-9">
        Your match percent with {selecteduser[0][1].firstName} is <b>{ (selecteduser[0][0] * 100).toFixed(0)}%</b><br />
        <b>height:</b> {selecteduser[0][1].height} ft<br />
        <b>weight:</b> {selecteduser[0][1].weight} lbs<br />
        <b>BMI:</b> {selecteduser[0][1].bmi}
      </div>
      <div className = "row">
        <div className = "col-sm-12">
          {selecteduser[0][1].events.length ? <EventsList events={selecteduser[0][1].events} heading={followingEventsHeading} /> : null}
        </div>
      </div>
    </div>
  )
}

const MapState = (state) => {
  return {
      similarUsers: state.similarUsers
  }
}
export default connect(MapState)(OtherUserProfile)

OtherUserProfile.propTypes = {
  similarUsers: PropTypes.array
}
