import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {createEventThunk} from '../store'
import DatePicker from 'react-datepicker'
import moment from 'moment'

/**
 * COMPONENT
 */
export class CreateEvent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: moment().format('MM/DD/YYYY')
    }

    this.pickDate = this.pickDate.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  inputWithButton(props) {
    return (
    <span className="input-group-btn">
        <button type="button" className="btn btn-outline blue ml1" onClick={props.onClick} >
            <i className="fa fa-calendar"></i>
        </button>
    </span>
  )
 }
  pickDate(date) {
    this.setState({
        startDate: date.format('MM/DD/YYYY')
    })
  }

  handleSubmit(evt){
    evt.preventDefault()
    const newEvent = {}
    newEvent.name = evt.target.Name.value
    newEvent.description = evt.target.Description.value
    newEvent.image = evt.target.imgUrl.value
    newEvent.date = this.state.startDate
    newEvent.day = evt.target.Day.value
    newEvent.recurrence = evt.target.Recurrence.value
    newEvent.difficulty = evt.target.Difficulty.value

    console.log('****', newEvent)
    // this.props.createEventThunk()
  }

  render () {
    const {user} = this.props

    return (
      <div className="content">
        <div className="container-fluid">
          <div className="row">

          {/* Code to create an event below */}
          <div className="row">
            <div className="col-md-12">
              <div>
                <h4>Create an event</h4>
                <form onSubmit={this.handleSubmit}>

                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" name ="Name" className="form-control border-input" placeholder="Name" />
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <input type="text" name ="Description" className="form-control border-input" placeholder="Description" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                        <label>Image URL</label>
                        <input type="text" name ="imgUrl" className="form-control border-input" placeholder="imgUrl" />
                    </div>

                    <div className="form-group">
                      <label>Date</label>
                      <div className="flex">
                          <input type="text" className="field flex-auto mb2" value={this.state.startDate} />
                          <DatePicker
                              customInput={<this.inputWithButton />}
                              onChange={this.pickDate}
                              minDate={moment()}
                              popperModifiers={{
                                  offset: {
                                      enabled: true,
                                      offset: '-20px'
                                  }
                              }}
                          />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Day of the week</label>
                      <select className="form-control border-input" name ="Day" placeholder="Difficulty">
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                        <option value="Saturday">Saturday</option>
                        <option value="Sunday">Sunday</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Recurrence</label>
                      <select className="form-control border-input" name ="Recurrence" placeholder="Difficulty">
                        <option value="one day">One day</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Difficulty</label>
                      <select className="form-control border-input" name ="Difficulty" placeholder="Difficulty">
                        <option value="1">1 - Easy</option>
                        <option value="2">2</option>
                        <option value="3">3 - Low Intensity</option>
                        <option value="4">4</option>
                        <option value="5" >5 - Medium</option>
                        <option value="6">6 - </option>
                        <option value="7">7</option>
                        <option value="8">8 - Hard</option>
                        <option value="9">9</option>
                        <option value="10">10 - Very Hard</option>
                      </select>
                    </div>
                    <div className="form-group">
                      {/* ADD LOCATION COMPONENT HERE */}
                    </div>

                    <button className="btn btn-default" type="submit">Create Event</button>
                  </div>
                </div>

                </form>
              </div>
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
    user: state.user
  }
}
const mapDispatch = (dispatch) => {
  return {
    createEvent (event) {
      dispatch(createEventThunk(event))
    }
  }
}
export default connect(mapState, mapDispatch)(CreateEvent)

/**
 * PROP TYPES
 */
CreateEvent.propTypes = {
  user: PropTypes.object
}
