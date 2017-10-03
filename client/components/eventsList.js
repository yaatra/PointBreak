import React from 'react'

const EventsList = props => {
  const {events, heading} = props
  return (
    <div className="container">
      {heading ? <div><h4>{heading}</h4><hr /></div> : null}
      {events.map(event => {
          return (
              <div className='thumbnail col-sm-3' key={event.id}>
                  {event.name}
                  <hr />
                  <img src={event.image_url || event.image} className='img-responsive' height='300' width='300' />
              </div>
          )
      })}
    </div>
  )
}

export default EventsList
