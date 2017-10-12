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
                <div className="row">
                  <div className="col-sm-8 col-xs-12">
                  <div className="listDetailsInfo">
                  <div className="detailsInfoBox">
                    <h3>About this Event</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed eiusmod tempor incididunt  labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident. sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam. </p>
                    <p>Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est. </p>
                    <p>Qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui </p>
                  </div>
                  </div>
                </div>
                <div className="col-sm-4 col-xs-12">
                {/* <div className="clearfix map-sidebar map-right">
                  <div id="map" style={{position: "relative", margin: 0,padding: 0,height: "538px", maxWidth: "none"}}></div>
                </div> */}
               </div>
              </div>
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
