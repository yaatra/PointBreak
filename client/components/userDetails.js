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

  if (user.fitbitInfo.weekSteps !== undefined) {
    user.fitbitInfo.weekSteps.forEach(dailySteps => {
        let obj = {
            'label': weekdays[i],
            'value': +(dailySteps.steps),
            'color': colors[i]
        }
        i++
        contentData.push(obj)
    })
    var pie = new d3pie("pieChart", {
      "header": {
      "title": {
          "text": "Week Step Summary",
          "fontSize": 24,
          "font": "open sans"
      },
      "subtitle": {
          "text": "Steps taken this week",
          "color": "#999999",
          "fontSize": 12,
          "font": "open sans"
      },
      "titleSubtitlePadding": 9
      },
      "footer": {
      "color": "#999999",
      "fontSize": 10,
      "font": "open sans",
      "location": "bottom-right"
      },
      "size": {
      "canvasHeight": 400,
      "canvasWidth": 520,
      "pieOuterRadius": "90%"
      },
      "data": {
      "sortOrder": "value-desc",
      "content": contentData
      },
      "labels": {
      "outer": {
          "pieDistance": 32
      },
      "inner": {
          "hideWhenLessThanPercentage": 3
      },
      "mainLabel": {
          "fontSize": 11
      },
      "percentage": {
          "color": "#ffffff",
          "decimalPlaces": 0
      },
      "value": {
          "color": "#adadad",
          "fontSize": 11
      },
      "lines": {
          "enabled": true
      },
      "truncation": {
          "enabled": true
      }
      },
      "effects": {
      "load": {
          "speed": 1380
      },
      "pullOutSegmentOnClick": {
          "speed": 380,
          "size": 8
      }
      },
      "misc": {
      "gradient": {
          "enabled": true,
          "percentage": 100
      }
      }
  })
  }

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
        {user.fitbitInfo.monthAverageSteps ?
          <div>
          <h5>Fitbit summary Info</h5>
          <p>{user.fitbitInfo.monthAverageSteps} average monthly steps</p>
          {user.fitbitInfo.weekSteps ?
            <div id="pieChart" />
            : null
          }

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
