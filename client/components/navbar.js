import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link, NavLink} from 'react-router-dom'
import {logout} from '../store'


const Navbar = (props) => {
    const {handleClick, isLoggedIn, email} = props

    return(<nav className="navbar navbar-default">
        <div className="container-fluid">
        <Link to='/'>Main</Link>
        {
          isLoggedIn
            ? <div>
              {/* The navbar will show these links after you log in */}
              <Link to='/home'>User Home</Link>
              <a href='#' onClick={handleClick}>Logout</a>
            </div>
            : <div>
              {/* The navbar will show these links before you log in */}
              <Link to='/login'>Login</Link>
              <Link to='/signup'>Sign Up</Link>
            </div>
        }
        </div>
        </nav>)

}


const mapState = (state) => {
    return {
        isLoggedIn: !!state.user.id,
        email: state.user.email
    }
}

const mapDispatch = (dispatch) => {
    return {
      handleClick () {
        dispatch(logout())
      }
    }
}

export default withRouter(connect(mapState, mapDispatch)(Navbar))

Navbar.propTypes = {
    children: PropTypes.object,
    handleClick: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    email: PropTypes.string
}
