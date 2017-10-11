import React, {Component} from 'react'
import {connect} from 'react-redux'
import {loadUserData, getFitbitDataThunk} from '../store'
import {FitbitGraph} from './'

/**
 * COMPONENT
 */
class UserDetails extends Component {
    componentDidMount(){
        const userID = this.props.user.id
        const fitbitinfoId = this.props.user.fitbitInfoId
        this.props.getAllUserData(userID, fitbitinfoId)
    }

    render() {
    const {user} = this.props
    let colors = ['#2484c1', '#0c6197', '#4daa4b', '#90c469', '#daca61', '#e4a14b', '#e98125']
    let weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    let contentData = []
    let i = 0

    if (user.fitbitInfo) {
        user.fitbitInfo.weekSteps.forEach(dailySteps => {
            let obj = {
                'label': weekdays[i],
                'value': +(dailySteps.steps) || 0,
                'color': colors[i]
            }
            i++
            contentData.push(obj)
        })
    }

    return (
        <div className="row">

            <div className="col-md-4 col-sm-5 col-xs-12">
                <div className="dashboardBoxBg mb30">
                    <div className="profileImage">

                        <div className="profileImage">
                            <img src={user.avatar} height="300" width="300" />
                        </div>
                        <div className="profileUserInfo bt profileName">
                            <h3>{user.firstName} {user.lastName}</h3>
                            <p>Email: {user.email}</p>
                            <p>BMI: {user.bmi.toFixed(1)}</p>
                            <p>Height: {user.height}</p>
                            <p>Weight: {user.weight}</p>
                            <p>Gender: {user.gender}</p>
                            <p>Age: {user.age}</p>
                        </div>

                    </div>
                </div>
            </div>

            <div className="col-md-8 col-sm-7 col-xs-12">
                <div className="dashboardBoxBg">
                    <div className="profileIntro">
                        <h4>My interests</h4>
                        { user.categories ? user.categories.map(category => <p key={category.id}>{category.name}</p>) : null}
                        <hr />
                        <h5>Preffered Destinations</h5>
                        { user.destinations ? user.destinations.map(destination => <p key={destination.id}>{destination.city}, {destination.state}, {destination.country}</p>) : null}
                        <hr />
                        <h5>Languages</h5>
                        { user.languages ? user.languages.map(lang => <p key={lang.id}>{lang.name}</p>) : null}
                        <hr />
                        <FitbitGraph contentData={contentData} user={user} />
                    </div>
                </div>
            </div>

        </div>
        )
    }
}

const mapState = (state) => {
    return {
      user: state.user
    }
  }

const mapDispatch = (dispatch) => {
    return {
      getAllUserData(userId, fitbitinfoId) {
        dispatch(loadUserData(userId))
        dispatch(getFitbitDataThunk(fitbitinfoId))
      }
    }
  }
export default connect(mapState, mapDispatch)(UserDetails)
