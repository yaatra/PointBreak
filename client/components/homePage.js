import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {SimpleForm, EventsList} from './'
import {fetchEvents} from '../store'

export class HomePage extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.getAllEvents()
    }
    
    render(){
        // this.props.getAllEvents()
        let trendingEvents = this.props.allEvents.splice(0, 4)
        console.log("fetchEvents:", fetchEvents)
        console.log("this.props:", this.props)
        return(<div className='container'>
            <h1>Home Page</h1>
            <SimpleForm/>
            <div className='eventList'>
            <h4>Trending Events</h4>
            <hr/>
            {this.props.allEvents ? <EventsList events={trendingEvents}/> : null}
            </div>
        </div>
        )
    }
}

const mapState = (state) => {
    return {
        allEvents: state.events
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