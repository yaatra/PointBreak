import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createEventThunk } from "../store";
import DatePicker from "react-datepicker";
import moment from "moment";

/**
 * COMPONENT
 */
export class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment().format("MM/DD/YYYY")
    };

    this.pickDate = this.pickDate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  inputWithButton(props) {
    return (
      <span className="input-group-btn">
        <button
          type="button"
          className="btn btn-primary"
          onClick={props.onClick}
          background-color="#2196f3"
        >
          <i className="fa fa-calendar" />
        </button>
      </span>
    );
  }
  pickDate(date) {
    this.setState({
      startDate: date.format("MM/DD/YYYY")
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const newEvent = {};
    newEvent.name = evt.target.Name.value;
    newEvent.description = evt.target.Description.value;
    newEvent.image = evt.target.imgUrl.value;
    newEvent.date = this.state.startDate;
    newEvent.day = evt.target.Day.value;
    newEvent.recurrence = evt.target.Recurrence.value;
    newEvent.difficulty = evt.target.Difficulty.value;

    this.props.createEvent(newEvent, this.props.user.id);
  }

  render() {
    const { user } = this.props;

    return (
      <section className="clearfix bg-dark listingSection">
        <div className="container">
          {/* Code to create an event below */}
          <div className="row">
            <div className="col-xs-12">
              <div className="dashboardPageTitle text-center">
                <h2>Create an event</h2>
              </div>
              <div className="dashboardBoxBg mb30">
                <form className="listing__form" onSubmit={this.handleSubmit}>
                  <div className="profileIntro paraMargin">
                  <div className="form-group col-sm-6 col-xs-12">
                        <label>Name</label>
                        <input
                          type="text"
                          name="Name"
                          className="form-control border-input"
                          placeholder="Event name"
                        />
                      </div>
                 
                      <div className="form-group col-sm-6 col-xs-12">
                        <label>Description</label>
                        <input
                          type="text"
                          name="Description"
                          className="form-control border-input"
                          placeholder="Event description"
                        />
                      </div>
                    </div>
                 
                  <div className="row">
                    <div className="col-md-12">
                    <div className="form-group col-sm-6 col-xs-12">
                        <label>Image URL</label>
                        <input
                          type="text"
                          name="imgUrl"
                          className="form-control border-input"
                          placeholder="Event image URL"
                        />
                      </div>

                      <div className="form-group col-sm-6 col-xs-12">
                        <label>Date</label>
                        <div className="flex">
                          <input
                            type="text"
                            className="form-control border-input"
                            value={this.state.startDate}
                          />
                          <DatePicker
                            customInput={<this.inputWithButton />}
                            onChange={this.pickDate}
                            minDate={moment()}
                            popperModifiers={{
                              offset: {
                                enabled: true,
                                offset: "-20px"
                              }
                            }}
                          />
                        </div>
                      </div>

                      <div className="form-group col-sm-6 col-xs-12">
                        <label>Day of the week</label>
                        <select
                          className="form-control border-input"
                          name="Day"
                          placeholder="Day of the week"
                        >
                          <option value="Monday">Monday</option>
                          <option value="Tuesday">Tuesday</option>
                          <option value="Wednesday">Wednesday</option>
                          <option value="Thursday">Thursday</option>
                          <option value="Friday">Friday</option>
                          <option value="Saturday">Saturday</option>
                          <option value="Sunday">Sunday</option>
                        </select>
                      </div>

                      <div className="form-group col-sm-6 col-xs-12">
                      <div className="contactSelect">
                        <label>Recurrence</label>
                        <select
                          className="form-control border-input"
                          name="Recurrence"
                          placeholder="Recurrence"
                        >
                          <option value="one day">No recurrence</option>
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                        </select>
                        </div>
                      </div>

                      <div className="form-group col-sm-6 col-xs-12">
                        <label>Difficulty</label>
                        <select
                          className="form-control border-input"
                          name="Difficulty"
                          placeholder="Difficulty level"
                        >
                          <option value="1">1 - Easy</option>
                          <option value="2">2 - Easy Level 2</option>
                          <option value="3">3 - Lower Intensity</option>
                          <option value="4">4 - Low Intensity</option>
                          <option value="5">5 - Medium</option>
                          <option value="6">6 - Medium Level 2</option>
                          <option value="7">7 - Slightly Hard</option>
                          <option value="8">8 - Hard</option>
                          <option value="9">9 - Very Hard</option>
                          <option value="10">10 - Extreme</option>
                        </select>
                      </div>
                    

                   
                    </div>
                    <div className="form-footer text-center">
                      <label/> 
                       {" "}
                        <button className="btn-submit" type="submit">
                          Create Event
                        </button>
                      </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* End of user created events */}
        </div>
      </section>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  };
};
const mapDispatch = dispatch => {
  return {
    createEvent(event, userId) {
      dispatch(createEventThunk(event, userId));
    }
  };
};
export default connect(mapState, mapDispatch)(CreateEvent);

/**
 * PROP TYPES
 */
CreateEvent.propTypes = {
  user: PropTypes.object
};
