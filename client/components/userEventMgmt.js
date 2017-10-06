import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchEventsForUser, deleteEventThunk} from '../store'

/**
 * COMPONENT
 */
export class UserEventMgmt extends Component {
  constructor () {
    super()
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount(){
    this.props.loadUserEvents(+this.props.user.id)
  }

  handleDelete(evt){
    console.log(+evt.target.value)
    evt.preventDefault()
    this.props.deleteSelectedEvent(+evt.target.value)
  }

  render () {
    const {user, eventsForUser} = this.props
    const createdEvents = []
    if (eventsForUser !== undefined) {
      eventsForUser.forEach(event => {
        if (event.type === 'created') createdEvents.push(event)
      })
    }

    return (
      <div className="content">
        <div className="container-fluid">
          <div className="row">

          {/*Create Event Button*/}
          <div className="col-md-12">
            <button className="btn" value={user.id}>Create an event</button>
          </div>
          {/*End of create Event Button*/}

          {/* Code to show the user's created events below */}
          <div className="row">
            <div className="col-md-12">
            {createdEvents[0] ?
              <div>
                <h4>Event Management Console</h4>
                <table className='table table-striped'>
                  <thead>
                    <tr>
                      <th>Event Id</th>
                      <th>Event name</th>
                      <th>Event difficulty</th>
                      <th>Event actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {createdEvents.map(event => (
                      <tr key={event.event.id}>
                        <td>{event.event.id}</td>
                        <td>{event.event.name}</td>
                        <td>{event.event.difficulty}</td>
                        <td><button className="btn btn-danger" value={event.event.id} onClick={this.handleDelete}>X</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            :
              <div>
                <h4>You have not created any events yet!</h4>
              </div>
            }
            </div>
          </div>
          {/* End of user created events */}


          </div>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.user,
    eventsForUser: state.events.eventsForUser
  }
}
const mapDispatch = (dispatch) => {
  return {
    loadUserEvents (userId) {
      dispatch(fetchEventsForUser(userId))
    },
    deleteSelectedEvent (eventId) {
      dispatch(deleteEventThunk(eventId))
    }
  }
}
export default connect(mapState, mapDispatch)(UserEventMgmt)

/**
 * PROP TYPES
 */
UserEventMgmt.propTypes = {
  user: PropTypes.object,
  eventsForUser: PropTypes.array
}
