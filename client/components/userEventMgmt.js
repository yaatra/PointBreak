import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchEventsForUser, deleteEventThunk} from '../store'
import history from '../history'
import { NavLink } from 'react-router-dom'


/**
 * COMPONENT
 */
export class UserEventMgmt extends Component {
  constructor () {
    super()
    this.handleDelete = this.handleDelete.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
  }

  componentDidMount(){
    this.props.loadUserEvents(+this.props.user.id)
  }

  handleDelete(evt){
    evt.preventDefault()
    this.props.deleteSelectedEvent(+evt.target.value, +this.props.user.id)
  }
  handleCreate(){
    history.push('/createEvent')
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
      <section className="clearfix bg-dark profileSection">
      <div className="container">




          {/*Create Event Button*/}
          <div className="row">
          <div className="col-md-12">
            <button className="btn btn-primary" value={user.id} onClick={this.handleCreate}>Create an event</button>
          </div>
          </div>
          {/*End of create Event Button*/}

          {/* Code to show the user's created events below */}
          <div className="row">
            <div className="col-md-12">
            <div className="table-wrapper table-responsive fixed-solution">


            {createdEvents[0] ?
              <div className="sticky-table-header">
                <h4>Event Management Console</h4>
                <table className='table table-striped'>
                  <thead>
                    <tr className="rowItem">
                      <th>Event Id</th>
                      <th>Event name</th>
                      <th>Event difficulty</th>
                      <th>Short description</th>
                      <th>Event actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {createdEvents.map(event => (
                      <tr key={event.id}  className="rowItem">
                        <td>{event.eventId}</td>
                        <td><NavLink to={`/locations/${event.eventId}`}>{event.event.name}</NavLink></td>
                        <td>{event.event.difficulty}</td>
                        <td>{event.event.description.length > 20 ? event.event.description.substring(0, 20) + '...' : event.event.description}</td>
                        <td><button className="btn btn-primary" value={event.eventId} onClick={this.handleDelete}>X</button></td>
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
          </div>
          {/* End of user created events */}



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
    eventsForUser: state.events.eventsForUser
  }
}
const mapDispatch = (dispatch) => {
  return {
    loadUserEvents (userId) {
      dispatch(fetchEventsForUser(userId))
    },
    deleteSelectedEvent (eventId, userId) {
      dispatch(deleteEventThunk(eventId, userId))
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
