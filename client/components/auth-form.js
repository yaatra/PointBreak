import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth, fetchCategories, fetchLanguages} from '../store'
import {AutoCompleteSearch} from './'

/**
 * COMPONENT
 */
class AuthForm extends Component {

  componentDidMount() {
    this.props.fetchCategories()
    this.props.fetchLanguages()
  }

  render() {
    const {name, user, categories, languages, displayName, handleSubmit, error} = this.props
    return (
      <div>
        <form onSubmit={handleSubmit} name={name}>
        {
          user ? (
            <div className="form-group row">
              <label htmlFor="first-name" className="col-2 col-form-label">First Name</label>
              <div className="col-10">
                <input className="form-control" type="text" value="Artisanal kale" id="first-name" />
              </div>
            </div>
          ) :
          null
        }
        {
          user ? (
            <div className="form-group row">
              <label htmlFor="last-name" className="col-2 col-form-label">Last Name</label>
              <div className="col-10">
                <input className="form-control" type="text" value="Artisanal kale" id="last-name" />
              </div>
            </div>
          ) :
          null
        }
          <div className="form-group row">
            <label htmlFor="email" className="col-2 col-form-label">Email</label>
            <div className="col-10">
              <input className="form-control" type="email" value="bootstrap@example.com" id="email" />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="password" className="col-2 col-form-label">Password</label>
            <div className="col-10">
              <input className="form-control" type="password" value="hunter2" id="password" />
            </div>
          </div>
        {
          user ? (
            <div className="form-group row">
              <label htmlFor="height" className="col-2 col-form-label">Height</label>
              <div className="col-10">
                <input className="form-control" type="text" value="Artisanal kale" id="height" />
              </div>
            </div>
          ) :
          null
        }
        {
          user ? (
            <div className="form-group row">
              <label htmlFor="weight" className="col-2 col-form-label">Weight</label>
              <div className="col-10">
                <input className="form-control" type="text" value="Artisanal kale" id="weight" />
              </div>
            </div>
          ) :
          null
        }
        {
          user ? (
            <div className="form-group row">
              <label htmlFor="age" className="col-2 col-form-label">Age</label>
              <div className="col-10">
                <input className="form-control" type="text" value="Artisanal kale" id="age" />
              </div>
            </div>
          ) :
          null
        }
        {
          user ? (
            <fieldset className="form-group">
              <legend>Gender</legend>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios1" value="option1" checked />
                  Male
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios2" value="option2" />
                  Female
                </label>
              </div>
            </fieldset>
          ) :
          null
        }
        {
          user ? (
            <div className="form-group">
              <label htmlFor="language">Select Languages</label>
              <select className="form-control" id="language" multiple>
                <option value="0">None</option>
                {
                  languages.map(language => {
                    return (
                      <option key={language.id} value={language.id}>{language.name}</option>
                    )
                  })
                }
              </select>
            </div>
          ) :
          null
        }
        {
          user ? (
            <div className="form-group">
              <label htmlFor="category">Select Preferred Categories</label>
              <select className="form-control" id="category" multiple>
                <option value="0">None</option>
                {
                  categories.map(category => {
                    return (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    )
                  })
                }
              </select>
            </div>
          ) :
          null
        }
        {
          user ? (
            <div className="form-group row">
              <label htmlFor="preferred-destination" className="col-2 col-form-label">Select Preferred Destination</label>
              <div className="col-10">
                <AutoCompleteSearch />
              </div>
            </div>
          ) :
          null
        }
        {
          user ? (
            <div className="form-group row">
              <label htmlFor="location" className="col-2 col-form-label">Location</label>
              <div className="col-10">
                <input className="form-control" type="text" value="Artisanal kale" id="location" />
              </div>
            </div>
          ) :
          null
        }
          <button type="submit" className="btn btn-primary">{displayName}</button>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
        <a href='/auth/google'>{displayName} with Google</a>
        <a href='/auth/fitbit'>{displayName} with Fitbit</a>
      </div>
    )
  }
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    user: state.user,
    categories: state.categories,
    languages: state.languages,
    error: state.user.error
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchCategories() {
      dispatch(fetchCategories())
    },
    fetchLanguages() {
      dispatch(fetchLanguages())
    },
    handleSubmit (evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
