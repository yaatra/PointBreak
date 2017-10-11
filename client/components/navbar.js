import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link, NavLink} from 'react-router-dom'
import {logout} from '../store'


const Navbar = (props) => {
    const {handleClick, isLoggedIn, email, cssClass} = props


    return (<div className={cssClass}>
        <div className="container-fluid header-bg">
          <div className="row">
            <div className="col-lg-4 col-sm-4 col-xs-6 header-left empty">empty
            </div>
            <div className="col-lg-8 col-sm-8 col-xs-6 header-right empty">empty
            </div>
          </div>
        </div>
        <nav id="menuBar" className="navbar navbar-default lightHeader" role="navigation">
        <div className="container">
        <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              {cssClass === 'nav-wrapper' ?
                <Link className="navbar-brand" to="/"><img src="http://localhost:8080/assets/SCSS/img/logo.png" alt="PointBreak" /></Link>
                :
                <Link className="navbar-brand" to="/"><img src="http://localhost:8080/assets/SCSS/img/logo-blue.png" alt="PointBreak" /></Link>
              }
            </div>
            <div className="collapse navbar-collapse navbar-ex1-collapse">
              <ul className="nav navbar-nav navbar-right">
              {
          isLoggedIn
            ? <ul className="nav navbar-nav navbar-right">
                {/* The navbar will show these links after you log in */}
                <li className="active dropdown singleDrop">
                  <a><Link to="/" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">home</Link></a>
                </li>
                <li>
                <Link to='/home'>User Home</Link>
                </li>
                <li>
                <Link to='/manageEvents'>Your admin console</Link>
                </li>
                <li>
                <a href='#' onClick={handleClick}>Logout</a>
                </li>
              </ul>
              : <ul className="nav navbar-nav navbar-right">
                <li className="active dropdown singleDrop">
                <Link to="/" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">home</Link>
                </li>
                {/* The navbar will show these links before you log in */}
                <li>
                <Link to='/login'>Login</Link>
                </li>
                <li>
                <Link to='/signup'>Sign Up</Link>
                </li>
                </ul>
              }
              </ul>
            </div>
        </div>
        </nav></div>)

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
