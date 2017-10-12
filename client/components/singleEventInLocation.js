import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchEvent, joinEvent, followEvent, removePendingEvent, removeFollowedEvent, loadUserData} from '../store'
import history from '../history'
import Chat from './chat'

class SingleEventInLocation extends Component {

  componentDidMount() {
    const id = this.props.match.params.id
    const {fetchEvent} = this.props
    fetchEvent(id)
  }

  render(){
    const {user, singleEvent, joinEvent, followEvent, pendingJoinEvent, followedEvent} = this.props
    const {category} = singleEvent
    const {users} = singleEvent

    return (
        <div>
        {
          singleEvent.name ?
          <div>
          <section className="clearfix paddingAdjustBottom">
            <div className="container">
              <div className="row">
              <div className="listingTitleArea col-sm-8">
                <h2>{singleEvent.name}</h2>
                <p>{singleEvent.location}</p>
                {
                category ?
                  <p>Category: {category.name}</p> :
                  null
                }
                <p>Description:{singleEvent.description}</p>
                <p>Difficulty: {singleEvent.difficulty}</p>
              </div>
              <div className="listingTitleArea col-sm-4 pull-right">
              <button className="btn btn-primary btn-lg" onClick={() => joinEvent(pendingJoinEvent.id, 'pendingJoin', user.id, singleEvent.id)}>
              {
                singleEvent.id === pendingJoinEvent.eventId ?
                'PENDING' :
                'JOIN'
              }
              </button>
              <button className="btn btn-primary btn-lg" onClick={() => followEvent(followedEvent.id, 'followed', user.id, singleEvent.id)}>
              {
                singleEvent.id === followedEvent.eventId ?
                'FOLLOWING' :
                'FOLLOW'
              }
              </button>
              </div>
              </div>
            </div>
            </section>
            <section className="clearfix paddingAdjustTopBottom">
              <ul className="list-inline listingImage">
                <li><img src={singleEvent.image_url || singleEvent.image} alt="Image Listing" className="img-responsive" /></li>
                <li><img src="https://point-break.herokuapp.com/assets/SCSS/img/listing/surfing1.jpg" alt="Image Listing" className="img-responsive-detailPage"/></li>
                <li><img src="https://point-break.herokuapp.com/assets/SCSS/img/listing/mountainBiking1.jpg" alt="Image Listing" className="img-responsive-detailPage"/></li>
                <li><img src="https://point-break.herokuapp.com/assets/SCSS/img/listing/bangee1.jpg" alt="Image Listing" className="img-responsive-detailPage"/></li>
              </ul>
            </section>

            <section className="clearfix paddingAdjustTop">
              <div className="container">
              {
                singleEvent.id ?
                <Chat eventId={singleEvent.id} /> :
                null
              }
              </div>
            </section>
            <div>

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
            </div></div> :
            <div>
              <h4>The event does not exist yet!</h4>
            </div>
        }
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
