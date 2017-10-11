import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth, fetchLanguages, fetchCategories} from '../store'
import SignupAutoCompleteSearch from './signupAutoCompleteSearch'

/**
 * COMPONENT
 */
class AuthForm extends Component {
  constructor() {
    super()

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      height: '',
      weight: '',
      age: '',
      gender: 'male',
      languages: [],
      categories: [],
      locations: []
    }

    this.handleChange1 = this.handleChange1.bind(this)
    this.handleChange2 = this.handleChange2.bind(this)
    this.handleChange3 = this.handleChange3.bind(this)
    this.handleChange4 = this.handleChange4.bind(this)
    this.handleChange5 = this.handleChange5.bind(this)
    this.handleChange6 = this.handleChange6.bind(this)
    this.handleChange7 = this.handleChange7.bind(this)
    this.handleChange8 = this.handleChange8.bind(this)
    this.handleChange9 = this.handleChange9.bind(this)
    this.handleChange10 = this.handleChange10.bind(this)
    this.addLocation = this.addLocation.bind(this)
  }

  componentDidMount() {
    this.props.fetchLanguages()
    this.props.fetchCategories()
  }

  addLocation(location) {
    this.setState({
      locations: [...this.state.locations, ...location]
    })
  }

  handleChange1(event) {
    this.setState({
      firstName: event.target.value
    })
  }

  handleChange2(event) {
    this.setState({
      lastName: event.target.value
    })
  }

  handleChange3(event) {
    this.setState({
      email: event.target.value
    })
  }

  handleChange4(event) {
    this.setState({
      password: event.target.value
    })
  }

  handleChange5(event) {
    this.setState({
      height: event.target.value
    })
  }

  handleChange6(event) {
    this.setState({
      weight: event.target.value
    })
  }
  handleChange7(event) {
    this.setState({
      age: event.target.value
    })
  }

  handleChange8(event) {
    this.setState({
      gender: event.target.value
    })
  }

  handleChange9(event) {
    const {options} = event.target
    const languages = Object.keys(options).filter(language => options[language].selected === true).map(language => options[language].value)
    this.setState({
      languages
    })
  }

  handleChange10(event) {
    const {options} = event.target
    const categories = Object.keys(options).filter(category => options[category].selected === true).map(category => options[category].value)
    this.setState({
      categories
    })
  }

  render() {
    const {isLoggedIn, name, user, categories, languages, locations, displayName, handleSubmit, error} = this.props
    const firstName = this.state.firstName
    const lastName = this.state.lastName
    const email = this.state.email
    const password = this.state.password
    const height = this.state.height
    const weight = this.state.weight
    const age = this.state.age
    const gender = this.state.gender
    const selectedLanguages = this.state.languages
    const selectedCategories = this.state.categories
    const selectedLocations = this.state.locations
    return (
      <div className="container">
        <form onSubmit={event => handleSubmit(event, firstName, lastName, email, password, height, weight, age, gender, selectedLanguages, selectedCategories, selectedLocations, name)} name={name}>
        {
          user ? (
            <div className="form-group row">
              <label htmlFor="first-name" className="col-2 col-form-label">First Name</label>
              <div className="col-10">
                <input className="form-control" type="text" value={this.state.firstName} id="first-name" onChange={this.handleChange1} />
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
                <input className="form-control" type="text" value={this.state.lastName} id="last-name" onChange={this.handleChange2} />
              </div>
            </div>
          ) :
          null
        }
          <div className="form-group row">
            <label htmlFor="email" className="col-2 col-form-label">Email</label>
            <div className="col-10">
              <input className="form-control" type="email" value={this.state.email} id="email" onChange={this.handleChange3} />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="password" className="col-2 col-form-label">Password</label>
            <div className="col-10">
              <input className="form-control" type="password" value={this.state.password} id="password" onChange={this.handleChange4} />
            </div>
          </div>
        {
          user ? (
            <div className="form-group row">
              <label htmlFor="height" className="col-2 col-form-label">Height</label>
              <div className="col-10">
                <input className="form-control" type="text" value={this.state.height} id="height" placeholder="...6.1 feet" onChange={this.handleChange5} />
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
                <input className="form-control" type="text" value={this.state.weight} id="weight" onChange={this.handleChange6} />
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
                <input className="form-control" type="text" value={this.state.age} id="age" onChange={this.handleChange7} />
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
                  <input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios1" value="male" checked={this.state.gender === 'male'} onChange={this.handleChange8} />
                  Male
                </label>
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="radio" className="form-check-input" name="optionsRadios" id="optionsRadios2" value="female" checked={this.state.gender === 'female'} onChange={this.handleChange8} />
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
              <select className="form-control" value={this.state.languages} id="language" multiple onChange={this.handleChange9}>
                <option value="None">None</option>
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
              <select className="form-control" value={this.state.categories} id="category" multiple onChange={this.handleChange10}>
                <option value="None">None</option>
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
                <SignupAutoCompleteSearch addLocation={this.addLocation}/>
              </div>
            </div>
          ) :
          null
        }
          <button type="submit" className="btn btn-primary pull-left">{displayName}</button>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
        {
          displayName === 'Sign Up'?
          <div>
            <a href="/auth/google">{displayName} with Google</a>
            <a href="/auth/fitbit">{displayName} with Fitbit</a>
          </div> :
          null
        }
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
    languages: state.languages,
    categories: state.categories,
    locations: state.locations,
    error: state.user.error
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchLanguages() {
      dispatch(fetchLanguages())
    },
    fetchCategories() {
      dispatch(fetchCategories())
    },
    handleSubmit(event, firstName, lastName, email, password, height, weight, age, gender, selectedLanguages, selectedCategories, selectedLocations, formName) {
      event.preventDefault()

      dispatch(auth(firstName, lastName, email, password, height, weight, age, gender, selectedLanguages, selectedCategories, selectedLocations, formName))
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
  locations: PropTypes.array,
  error: PropTypes.object
}
