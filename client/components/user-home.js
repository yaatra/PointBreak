import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import UserDetails from './userDetails'
import {fetchEventsForUser} from '../store'
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

  render () {
    let events = this.props.events
    // let user = this.props.user
    let selectedEvents = []
    let followingEvents = []
    if (events.length >= 0) {
      selectedEvents = events.map(e => {
        if (e.type === 'selected') return e.event
      }).filter(el => el !== undefined)

      followingEvents = events.map(e => {
        if (e.type === 'followed') return e.event
      }).filter(el => el !== undefined)

    }
    return (
      <section className="clearfix bg-dark profileSection">
      <div className="container">
        {this.props.user ?
          (<div>
            <UserDetails user={this.props.user} />
            <SocialConnection />
          </div>)
          :
          (<div>
            <p>ERROR: This user can't be loaded - missing data</p>
          </div>)
        }

        {followingEvents.length > 0 ? <EventsList events={followingEvents} heading="Following Events" fromUser="true" /> : null}
        {selectedEvents.length > 0 ? <EventsList events={selectedEvents} heading="Selected Events"  fromUser="true" /> : null}
      </div>
      </section>
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
    getAllUserData(userId) {
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
