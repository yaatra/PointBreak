import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchEvent, joinEvent, followEvent, removePendingEvent, removeFollowedEvent} from '../store'
import history from "../history"

class SingleEventInLocation extends Component {

  componentDidMount() {
    const id = this.props.match.params.id
    const {fetchEvent} = this.props

    fetchEvent(id)
  }

  render() {
    const {user, singleEvent, joinEvent, followEvent, pendingJoinEvent, followedEvent} = this.props
    const {category} = singleEvent
    const {users} = singleEvent

    return (
      <div className="container">
        <div className="jumbotron">
        {
          singleEvent.name ? (
            <div>
              {singleEvent.name}
              <hr />
              <img src={singleEvent.image_url || singleEvent.image} className="img-fluid" />
              <div>Description: {singleEvent.description}</div>
              <div>Difficulty: {singleEvent.difficulty}</div>
              <div>Location: {singleEvent.location}</div>
              {
                category ?
                <div>Category Name: {category.name}</div> :
                null
              }
              {
                category ?
                <div>Category Image: <img src={category.image} className="img-fluid" /></div> :
                null
              }
              {
                users ? users.map(user => {
                  return (
                    <div key={user.id}>
                      <div><img src={user.avatar} style={{width: '300px', height: '300px'}} /></div>
                      <div>{user.firstName} {user.lastName}</div>
                      <div>Introduction: {user.introduction}</div>
                    </div>
                  )
                }) :
                null
              }
              <button className="btn btn-primary btn-lg" onClick={() => joinEvent(pendingJoinEvent.id, 'pendingJoin', user.id, singleEvent.id)}>
              {
                pendingJoinEvent.id ?
                'PENDING' :
                'JOIN'
              }
              </button>
              <button className="btn btn-primary btn-lg" onClick={() => followEvent(followedEvent.id, 'followed', user.id, singleEvent.id)}>
              {
                followedEvent.id ?
                'FOLLOWING' :
                'FOLLOW'
              }
              </button>
            </div>
          ) :
            <div>
              <h4>The event does not exist yet!</h4>
            </div>
        }
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user,
  singleEvent: state.events.singleEvent,
  pendingJoinEvent: state.events.pendingJoinEvent,
  followedEvent: state.events.followedEvent
})

const mapDispatch = dispatch => ({
  fetchEvent(id) {
    dispatch(fetchEvent(id))
  },
  joinEvent(pendingJoinEventId, type, userId, eventId) {
    if (pendingJoinEventId) {
      dispatch(removePendingEvent(type, userId, eventId))
    } else if (userId) {
      dispatch(joinEvent(type, userId, eventId))
    } else {
      history.push('/login')
    }
  },
  followEvent(followedEventId, type, userId, eventId) {
    if (followedEventId) {
      dispatch(removeFollowedEvent(type, userId, eventId))
    } else if (userId) {
      dispatch(followEvent(type, userId, eventId))
    } else {
      history.push('/login')
    }
  }
})

export default connect(mapState, mapDispatch)(SingleEventInLocation)
