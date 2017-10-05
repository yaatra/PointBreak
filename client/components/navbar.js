import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link, NavLink} from 'react-router-dom'
import {logout} from '../store'


const Navbar = (props) => {
    const {handleClick, isLoggedIn, email} = props

    return(<nav className="navbar navbar-default">
        <div className="container-fluid">
        <ul className="nav navbar-nav navbar-left">
            <li>   
            <Link to='/'>Main</Link>
            </li>
            </ul>    
        {
          isLoggedIn
            ? <ul className="nav navbar-nav navbar-right">
              {/* The navbar will show these links after you log in */}
              <li> 
              <Link to='/home'>User Home</Link>
              </li>
              <li>  
              <a href='#' onClick={handleClick}>Logout</a>
              </li> 
            </ul>
            : <ul className="nav navbar-nav navbar-right">
              {/* The navbar will show these links before you log in */}
              <li> 
              <Link to='/login'>Login</Link>
              </li>
              <li>  
              <Link to='/signup'>Sign Up</Link>
              </li> 
              </ul>
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
