import React, { Component } from 'react'
import {connect} from 'react-redux'
import { fetchSimilarThunk } from '../store';
import {UsersList} from './'

class SocialConnection extends Component {
    componentDidMount() {
        if (this.props.user) {
            this.props.getSimilarPeople(this.props.user)
        }
    }
    render() {
        const {similarUsers} = this.props
        return (
            <div>
            {similarUsers.length ? <UsersList similarUsers={similarUsers} heading="People with similar interests" /> : null}
            </div>
        )
    }
}


const MapState = (state) => {
    return {
        similarUsers: state.similarUsers,
        user: state.user
    }
}

const MapDispatch = (dispatch) => {
    return {
        getSimilarPeople(user){
            dispatch(fetchSimilarThunk(user))
        }
    }
}
export default connect(MapState, MapDispatch)(SocialConnection)

