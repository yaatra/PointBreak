import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {SimpleForm} from './'

export class HomePage extends Component {
    render(){
        return(<div className='container'>
            <h1>Home Page</h1>
            <SimpleForm/>
        </div>)
    }
}