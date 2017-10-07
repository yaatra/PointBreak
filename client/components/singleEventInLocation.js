import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchEvent, joinEvent, followEvent} from '../store'
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
          <a className="btn btn-primary btn-lg" href="#" role="button" onClick={pendingJoinEvent.id ? event => removeEvent(event) : user.id ? joinEvent(event, 'pendingJoin', user.id, singleEvent.id) : history.push('/login')}>
          {
            pendingJoinEvent.id ?
            'PENDING' :
            'JOIN'
          }
          </a>
          <a className="btn btn-primary btn-lg" href="#" role="button" onClick={event => user.id ? followEvent(event, 'followed', user.id, singleEvent.id) : history.push('/login')}>
          {
            followedEvent.id ?
            'FOLLOWING' :
            'FOLLOW'
          }
          </a>
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
  joinEvent(event, type, userId, eventId) {
    event.preventDefault()
    dispatch(joinEvent(type, userId, eventId))
  },
  followEvent(event, type, userId, eventId) {
    event.preventDefault()
    dispatch(followEvent(type, userId, eventId))
  },
  removeEvent(event) {

  }
})

export default connect(mapState, mapDispatch)(SingleEventInLocation)
