import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

const EventsList = props => {
  const {events, heading, fromUser, type} = props
  // type: own, yelp, featured, userHome

  function eventDisplay() {
    return (
      <div>

        {heading && events.length ? <div className="page-header text-center"><h2>{heading}</h2><hr /></div> : null}
        <div className="row isotopeContainer" id="container">

          {events.map(event => {
              return (
                <div className={type === 'featured'  ? 'col-md-4 col-sm-6 col-xs-12 isotopeSelector featuredItem' : (type === 'yelp'  ? 'col-md-3 col-sm-6 col-xs-12 isotopeSelector featuredItem': 'col-md-3 col-sm-6 col-xs-12 isotopeSelector featuredItem')} key={event.id}>
                  <Link to={typeof event.id === 'number' ? `/locations/${event.id}` : `/locations/yelp/${event.id}`}>
                    <article className="">
                    <figure>
                      <img src={event.image_url || event.image} className="img-responsive" />
                      <div className="overlay-background">
                        <div className="inner" />
                      </div>

                      <a href="category-grid.html" />
                      <div className="overlay" >
                        <div className="overlayInfo">
                          {/* ADD STUFF FOR IMG And FOLLOWER OVERLAY - IF YOU WANT */}
                        </div>
                      </div>
                    </figure>

                    {typeof event.id === 'number' && type !== 'userHome' &&
                      (<div>
                      <div className="figureBody">
                        <h5><a href="category-grid.html">{event.name}<i className="fa fa-check-circle" aria-hidden="true" /></a></h5>
                        <p>{moment(event.date).format(
                          'MMMM Do YYYY, h:mm:ss a'
                        )}, {event.location} <a href="category-grid.html" /></p>
                        <h5>Difficulty: {event.difficulty}</h5>
                      </div>
                      <div className="figureFooter">
                        <p>{event.description.slice(0, 40) + '...'}</p>
                      </div>
                      </div>)
                    }
                    {typeof event.id === 'number' && type === 'userHome' &&
                      (<div>
                        <div className="figureFooter"><a href="category-grid.html">{event.name}</a></div>
                      </div>)
                    }
                    {typeof event.id !== 'number' &&
                      (<div>
                      <div className="figureBody">
                        <h5><a href="category-grid.html">{event.name}</a></h5>
                        {<p>{event.phone} <a href="category-grid.html" /></p>}
                      </div>
                      <div className="figureFooter">
                        <p>Rating: {event.rating}</p>
                      </div>
                      </div>)
                    }
                    </article>
                  </Link>
                </div>
              )
          })}
        </div>

      </div>
    )
  }

  // Main return with custom heading/section/div styling
  if (fromUser === 'true') {
    return (
      <div className="col-xs-12">
        <div className="dashboardBoxBg">
        {eventDisplay()}
        </div>
      </div>
    )
  } else {
    return (
      <section className="clearfix interestArea">
        <div className="container">
        {eventDisplay()}
        </div>
      </section>
    )
  }
}

export default EventsList
