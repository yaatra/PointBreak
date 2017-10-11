import React from 'react'
import {Link} from 'react-router-dom'

const UsersList = props => {
  const {similarUsers, heading} = props
  return (
    <section className="clearfix bg-dark profileSection">
    <div className="col-xs-12">
      <div className="pageTitle">
        {heading ? <div><h4>{heading}</h4><hr /></div> : null}
      </div>
      <div className="row">
      {similarUsers.map(user => {
          return (
            <div className="col-md-2 col-sm-5 col-xs-12">
              <div className="dashboardBoxSmall mb30">
                <div className="profileImageSmall">
                    <Link to={`/publicProfile/${user[1].id}`} >
                      <p><b>{user[1].firstName} {user[1].lastName}</b></p>
                      <img src={user[1].avatar || user[1].image} className="img-responsive50pct" />
                      <p>Match: <b>{(user[0] * 100).toFixed(0)}%</b></p>
                    </Link>
                </div>
              </div>
            </div>
          )
      })}
      </div>
    </div>
    </section>
  )
}

export default UsersList
