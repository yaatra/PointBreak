import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { fetchSimilarThunk } from '../store';


class SocialConnection extends Component {
    componentDidMount() {
        if(this.props.user) {
            this.props.getSimilarPeople(this.props.user)
        }
    }
    render() {
        return(<div>
            <h4>People with similar interests</h4>
            <hr/>
        </div>)
    }
}


const MapState = (state) =>{ 
    return {
        similarPeople: state.similarUsers,
        user: state.user
    }
}

const MapDispatch = (dispatch) =>{ 
    return {
        getSimilarPeople(user){
            dispatch(fetchSimilarThunk(user))
        }
    }
}
export default connect(MapState, MapDispatch)(SocialConnection)

