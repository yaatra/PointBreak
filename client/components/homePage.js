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
        let trendingEvents = this.props.allEvents.slice(0, 4)

        return (
            <header id="pageTop" className="header">
            <section className="clearfix homeBanner">
            <div className="container">
		    <div className="row">
			<div className="col-xs-12">
			<div className="banerInfo">
                <h1>Explore. Conquer. Discover</h1>
					<p>PointBreak gets you the best curated extreme sports events around you</p>

                <AutoCompleteSearch />

            </div>
            </div>
            </div>
            </div>
            </section>
            <div className='eventList'>

            {this.props.allEvents ? <EventsList events={trendingEvents} heading="Trending Events" type="featured" /> : null}

            </div>
            </header>
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
        }
    }
}

export default connect(mapState, mapDispatch)(HomePage)

HomePage.PropTypes = {
    allEvents: PropTypes.array
}
