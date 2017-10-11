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
            <div className="col-md-4 col-sm-5 col-xs-12">
              <div className="dashboardBoxBg mb30">
                <div className="profileImage">

                  <div className="profileImage">

                    <Link to={`/publicProfile/${user[1].id}`} >
                      <p>{user[1].firstName} {user[1].lastName}</p>
                      <hr />
                      <img src={user[1].avatar || user[1].image} className="img-responsive" />
                      <p>Percentage Match to your interests: <b>{(user[0] * 100).toFixed(0)}%</b></p>
                    </Link>

                  </div>
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
