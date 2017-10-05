import React from 'react'

/**
 * COMPONENT
 */
const UserDetails = (props) => {
  const {user} = props

  return (
    <div>
      <h3>{user.firstName} {user.lastName}</h3><img src={user.avatar} height="300" width="300" />
      <p>Email: {user.email}</p>
      <p>BMI: {user.bmi}</p>
      <p>Height: {user.height}</p>
      <p>Weight: {user.weight}</p>
      <p>Age: {user.age}</p>
    </div>
  )
}

export default UserDetails
