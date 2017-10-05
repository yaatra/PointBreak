import React from 'react'
import {Link} from 'react-router-dom'

const UsersList = props => {
  const {similarUsers, heading} = props
  return (
    <div className="container">
      
      {heading ? <div><h4>{heading}</h4><hr /></div> : null}
      <div className="row">
      {similarUsers.map(user => {
          return (

              <div className="thumbnail col-sm-3" key={user[1].id}>
                <Link to={`/publicProfile/${user[1].id}`} >
                  <p>{user[1].firstName} {user[1].lastName}</p>
                  <hr />
                  <img src={user[1].avatar || user[1].image} className="img-responsive" />
                  <p>Percentage Match to your interests: {(user[0] * 100).toFixed(0)}%</p>
                </Link>
              </div>
          )
      })}
      </div>
    </div>
  )
}

export default UsersList
