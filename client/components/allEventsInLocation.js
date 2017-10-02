import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {EventsList} from './'

export class AllEventsInLocation extends Component {
  componentDidMount(){}

  render() {
    let locationHeading = 'Explore ' + this.props.location
    return (
      <div className='eventList'>
        {this.props.eventsByLocation ? <EventsList events={this.props.eventsByLocation} heading={locationHeading} /> : null}
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    location: state.location.address,
    eventsByLocation: state.events.eventsByLocation
  }
}

export default connect(mapState)(AllEventsInLocation)

AllEventsInLocation.PropTypes = {
  location: PropTypes.object,
  eventsByLocation: PropTypes.array
}
