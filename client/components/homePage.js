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
        return (
            <header id="pageTop" className="header">
            <section className="clearfix homeBanner">
            <div className="container">
		    <div className="row">
			<div className="col-xs-12">
			<div className="banerInfo">
                <h1>Explore. Discover. Share</h1>
					<p>Listty helps to find out great things arround you</p>
            {/* <form className="form-inline" action="listing-sidebar-map-left.html" method="">
                <div className="form-group">
                <div className="input-group">                     */}
                <AutoCompleteSearch />
                {/* </div>
			    </div>
            </form> */}
            </div>
            </div>
            </div>
            </div>
            </section>
            <div className='eventList'>
            {this.props.allEvents ? <EventsList events={trendingEvents} heading="Trending Events" /> : null}
            </div>
            </header>)
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
