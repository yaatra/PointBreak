import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'


class SocialConnection extends Component {
    render() {
        return(<div>
            <h4>People with similar interests</h4>
            <hr/>
        </div>)
    }
}


const MapState = (state) =>{ 
    return {

    }
}
export default connect(MapState)(SocialConnection)

