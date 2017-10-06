import React from 'react'
import { NavLink } from 'react-router-dom'

const EventsList = props => {
  const {events, heading, size } = props

  return (
    <div className="container">

      {heading ? <div><h4>{heading}</h4><hr /></div> : null}

      {events.map(event => {
          return (
              <div className='thumbnail col-sm-3' key={event.id}>
                  {event.name}
                  <hr />
                  <NavLink to={typeof event.id === 'number' ? `/locations/${event.id}` : `/locations/yelp/${event.id}`}><img src={event.image_url || event.image} className='img-responsive' /></NavLink>
              </div>
          )
      })}
    </div>
  )
}

export default EventsList
