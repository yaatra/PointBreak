import React from 'react'

/**
 * COMPONENT
 */
const UserDetails = (props) => {
  const {user} = props

  return (
    <div className="row">
      <div className="col-sm-3">
        <h3>{user.firstName} {user.lastName}</h3><img src={user.avatar} height="300" width="300" />
        <p>Email: {user.email}</p>
        <p>BMI: {user.bmi}</p>
        <p>Height: {user.height}</p>
        <p>Weight: {user.weight}</p>
        <p>Age: {user.age}</p>
      </div>
      <div className="col-sm-9 text-right">
        <h4>My interests</h4>
        { user.categories ? user.categories.map(category => <p key={category.id}>{category.name}</p>) : null}
        <hr/>
        <h5>Preffered Destinations</h5>
        { user.destinations ? user.destinations.map(destination => <p key={destination.id}>{destination.city}, {destination.state}, {destination.country}</p>) : null}
        <hr/>
        <h5>Languages</h5>
        { user.languages ? user.languages.map(lang => <p key={lang.id}>{lang.name}</p>) : null}
      </div>
    </div>
  )
}

export default UserDetails
