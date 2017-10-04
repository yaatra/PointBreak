import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {EventsList} from './'
import axios from 'axios'

export class AllEventsInLocation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      yelpEvents: [],
    }
  }
  componentDidMount(){
    const {location} = this.props
    console.log("LOCATION  ", location)
    axios.get(`/api/yelp/${location.lat}/${location.lng}`)
    .then(res => res.data)
    .then(yelpEvents => {
      this.setState({yelpEvents: yelpEvents.businesses })
    })
    .catch(err => console.log(err))
  }

  render() {
    let locationHeading = 'Extreme sports around ' + this.props.location.address
    return (
      <div className='eventList'>
        {this.props.eventsByLocation ? <EventsList events={this.props.eventsByLocation} heading={locationHeading} /> : null}

        {this.state.yelpEvents ? <EventsList events={this.state.yelpEvents} heading={`More things to do around ${this.props.location.address}`} size="150" /> : null}
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    location: state.location,
    eventsByLocation: state.events.eventsByLocation
  }
}

export default connect(mapState)(AllEventsInLocation)

AllEventsInLocation.PropTypes = {
  location: PropTypes.object,
  eventsByLocation: PropTypes.array
}
