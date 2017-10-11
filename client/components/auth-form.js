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
      <section className={name === 'login' ? "clearfix loginSection" : "clearfix signUpSection"}>
        <div className="container">
          <div className="row">
            <div className={name === 'login' ? "center-block col-md-5 col-sm-6 col-xs-12" : "center-block col-sm-8 col-xs-12"}>
              <div className={name === 'login' ? "panel panel-default loginPanel" : "signUpFormArea"}>
                {name === 'login' ? <div className="panel-heading text-center">Members log in</div> : null}
                {
                  name === 'signup' ?
                  <div className="priceTableTitle">
                    <h2>Account Registration</h2>
                    <p>Please fill out the fields below to create your account. We will send your account information to the email address you enter. Your email address and information will NOT be sold or shared with any 3rd party. If you already have an account, please, <a href="/login">click here</a>.</p>
                  </div> :
                  null
                }
                  <div className={name === 'login' ? "panel-body" : "signUpForm"}>
                    <form className={name === 'login' ? "loginForm" : ""} onSubmit={event => handleSubmit(event, firstName, lastName, email, password, height, weight, age, gender, selectedLanguages, selectedCategories, selectedLocations, name)} name={name}>
                    {name === 'signup' ?
                      <div className="formSection">
                        <h3>Contact Information</h3>
                        <div className="row">
                          <div className="form-group col-sm-6 col-xs-12">
                            <label htmlFor="firstName" className="control-label">First Name*</label>
                            <input type="text" className="form-control" value={this.state.firstName} id="firstName" onChange={this.handleChange1} />
                          </div>
                          <div className="form-group col-sm-6 col-xs-12">
                            <label htmlFor="lastName" className="control-label">Last Name*</label>
                            <input type="text" className="form-control" value={this.state.lastName} id="lastName" onChange={this.handleChange2} />
                          </div>
                        </div>
                      </div> :
                      null
                    }
                    {
                      name === 'signup' ?
                      <div className="formSection">
                        <h3>Account Information</h3>
                        <div className="row">
                          <div className="form-group col-sm-6 col-xs-12">
                            <label htmlFor="emailAdress" className="control-label">Email Address*</label>
                            <input type="email" className="form-control" value={this.state.email} id="emailAdress" onChange={this.handleChange3} />
                          </div>
                          <div className="form-group col-sm-6 col-xs-12">
                            <label htmlFor="passwordFirst" className="control-label">Password*</label>
                            <input type="password" className="form-control" value={this.state.password} id="passwordFirst" onChange={this.handleChange4} />
                          </div>
                        </div>
                      </div> :
                      null
                    }
                    {
                      name === 'signup' ?
                      <div className="formSection">
                        <h3>Personal Information</h3>
                        <div className="row">
                          <div className="form-group col-sm-6 col-xs-12">
                            <label htmlFor="height" className="control-label">Height*</label>
                            <input type="text" className="form-control" value={this.state.height} id="height" placeholder="...6.1 feet" onChange={this.handleChange5} />
                          </div>
                          <div className="form-group col-sm-6 col-xs-12">
                            <label htmlFor="weight" className="control-label">Weight*</label>
                            <input type="text" className="form-control" value={this.state.weight} id="weight" placeholder="...182 lbs" onChange={this.handleChange6} />
                          </div>
                          <div className="form-group col-sm-6 col-xs-12">
                            <label htmlFor="age" className="control-label">Age*</label>
                            <input type="text" className="form-control" value={this.state.age} id="age" onChange={this.handleChange7} />
                          </div>
                          <div className="form-group col-sm-6 col-xs-12">
                            <label className="control-label">Gender*</label>
                            <div className="form-check">
                              <label htmlFor="male" className="form-check-label">
                                <input type="radio" className="form-check-input" name="optionsRadios" id="male" value="male" checked={this.state.gender === 'male'} onChange={this.handleChange8} />
                                  &nbsp;&nbsp;Male
                              </label>
                            </div>
                            <div className="form-check">
                              <label htmlFor="female" className="form-check-label">
                                <input type="radio" className="form-check-input" name="optionsRadios" id="female" value="female" checked={this.state.gender === 'female'} onChange={this.handleChange8} />
                                  &nbsp;&nbsp;Female
                              </label>
                            </div>
                          </div>
                          <div className="form-group col-sm-6 col-xs-12">
                            <label htmlFor="language" className="control-label">Select Languages*</label>
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
                          <div className="form-group col-xs-12">
                            <label htmlFor="category" className="control-label">Select Preferred Categories*</label>
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
                          <div className="form-group col-sm-6 col-xs-12">
                            <label htmlFor="preferred-destination" className="control-label">Select Preferred Destination*</label>
                            <SignupAutoCompleteSearch addLocation={this.addLocation}/>
                          </div>
                        </div>
                      </div> :
                      null
                    }

                    {
                      name === 'login' ?
                      <div>
                        <div className="form-group">
                          <label htmlFor="emailAdress">Email *</label>
                          <input className="form-control" type="email" value={this.state.email} id="emailAdress" onChange={this.handleChange3} />
                          <p className="help-block">Enter your email.</p>
                        </div>
                        <div className="form-group">
                          <label htmlFor="passwordFirst">Password *</label>
                          <input className="form-control" type="password" value={this.state.password} id="passwordFirst" onChange={this.handleChange4} />
                          <p className="help-block">Enter the password that accompanies your email.</p>
                        </div>
                      </div> :
                      null
                    }

                    <div className={name === 'login' ? "form-group" : "form-group col-xs-12 mb0"}>
                      <button type="submit" className={name === 'login' ? "btn btn-primary pull-left" : "btn btn-primary"}>{displayName}</button>
                    </div>
                      {error && error.response && <div> {error.response.data} </div>}
                    </form>
                    {
                      displayName !== 'Log In' && displayName !== 'Sign Up'?
                      <div>
                        <a href="/auth/google">{displayName} with Google</a>
                        <a href="/auth/fitbit">{displayName} with Fitbit</a>
                      </div> :
                      null
                    }
                </div>
                {
                  name === 'login' ?
                  <div className="panel-footer text-center">
                    <p>Not a member yet? <a href="/signup" className="link">Sign up</a></p>
                  </div> :
                  null
                }
              </div>
            </div>
          </div>
        </div>
      </section>
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
    displayName: 'Log In',
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
