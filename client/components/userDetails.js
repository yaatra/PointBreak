import React from 'react'

/**
 * COMPONENT
 */
const UserDetails = (props) => {
  const {user} = props
  let colors = ['#2484c1', '#0c6197', '#4daa4b', '#90c469', '#daca61', '#e4a14b', '#e98125']
  let weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  let contentData = []
  let i = 0
  // user.fitbitInfo.weekSteps.forEach(dailySteps => {
  //     let obj = {
  //         'label': weekdays[i],
  //         'value': +(dailySteps.steps),
  //         'color': colors[i]
  //     }
  //     i++
  //     contentData.push(obj)
  // })
  // console.log(user.fitbitInfo)

  return (
    <div className="row">
      <div className="col-sm-3">
        <h3>{user.firstName} {user.lastName}</h3><img src={user.avatar} height="300" width="300" />
        <p>Email: {user.email}</p>
        <p>BMI: {user.bmi}</p>
        <p>Height: {user.height}</p>
        <p>Weight: {user.weight}</p>
        <p>Gender: {user.gender}</p>
        <p>Age: {user.age}</p>
      </div>
      <div className="col-sm-9 text-right">
        <h4>My interests</h4>
        { user.categories ? user.categories.map(category => <p key={category.id}>{category.name}</p>) : null}
        <hr />
        <h5>Preffered Destinations</h5>
        { user.destinations ? user.destinations.map(destination => <p key={destination.id}>{destination.city}, {destination.state}, {destination.country}</p>) : null}
        <hr />
        <h5>Languages</h5>
        { user.languages ? user.languages.map(lang => <p key={lang.id}>{lang.name}</p>) : null}
        <hr />
        {user.fitbitInfoId ?
          <div>
          <h5>Fitbit summary Info</h5>
          <p>{user.fitbitInfo.monthAverageSteps} average monthly steps</p>
          <p>Weekly steps summary</p>

          </div>
          :
          <div>
          <h5>No fitbit data yet</h5>
          </div>
        }
      </div>
    </div>
  )
}

export default UserDetails
