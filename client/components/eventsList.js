import React from 'react'
import { NavLink } from 'react-router-dom'

const EventsList = props => {
  const {events, heading} = props

  return (
    <div className="container">

      {/* {heading ? <div><h4>{heading}</h4><hr /></div> : null} */}
      <div className="row isotopeContainer" id="container">

      {events.map(event => {
          return (

        <div className="col-md-4 col-sm-6 col-xs-12 isotopeSelector featuredItem" key={event.id}>
          <article className="">
          <figure>
              <img src={event.image_url || event.image} className='img-responsive'/>
              <div className="overlay-background">
                <div className="inner"></div>
              </div>
              <a href="category-grid.html" />
              <div className="overlay" >
                <div className="overlayInfo">
                  <span className="label label-primary"><i className="fa fa-heart-o" aria-hidden="true"></i> 10 k</span>
                  <span className="label label-primary"><i className="fa fa-camera" aria-hidden="true"></i> 8</span>
                </div>
              </div>
          </figure>
          <div className="figureBody">
          	<h2><a href="category-grid.html">{event.name}<i className="fa fa-check-circle" aria-hidden="true"></i></a></h2>
            <p>{event.date}, {event.location} <a href="category-grid.html"></a></p>
            <h3>Difficulty: {event.difficulty}</h3>
          </div>
          <div className="figureFooter">
          	<p>{event.description}</p>
          </div>          
          </article>
        
        </div>)
      })}
      </div>
    </div>
  )
}

export default EventsList
