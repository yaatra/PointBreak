import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {AutoCompleteSearch, EventsList} from './'
import {fetchEvents} from '../store'

export class HomePage extends Component {

    componentWillMount(){
        this.props.getAllEvents()
    }

    render(){
        // this.props.getAllEvents()
        let trendingEvents = this.props.allEvents.splice(0, 4)
        //console.log("fetchEvents:", fetchEvents)
        //console.log("this.props:", this.props)
        return (<div className='container'>
            <h1>Home Page</h1>
            <AutoCompleteSearch />
            <div className='eventList'>
            {this.props.allEvents ? <EventsList events={trendingEvents} heading="Trending Events" /> : null}
            </div>
        </div>
        )
    }
}

const mapState = (state) => {
    return {
        allEvents: state.events.allEvents
    }
}

const mapDispatch = (dispatch) => {
    return {
        getAllEvents: () => {
            dispatch(fetchEvents())
        },
    }
}

export default connect(mapState, mapDispatch)(HomePage)

HomePage.PropTypes = {
    allEvents: PropTypes.array
}
