import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchYelpEvent, joinEvent, followEvent} from '../store'

class SingleYelpEventInLocation extends Component {

  componentDidMount() {
    const id = this.props.match.params.id
    const fetchYelpEvent = this.props.fetchYelpEvent

    fetchYelpEvent(id)
  }

  render() {
    const {event} = this.props
    const {categories} = event
    const {hours} = event
    const {location} = event
    const {photos} = event

    return (
      <div className="container">
        <div className="jumbotron">
          {event.name}
          <hr />
          <img src={event.image_url || event.image} className="img-fluid" />
          <div>Location: {location ? location.address1 : null}</div>
          <div>Phone: {event.phone}</div>
          <div>Price: {event.price}</div>
          <div>Hours: {hours ? hours[0].hours_type : null}</div>
          {
            hours ? hours[0].open.map(open => {
              return (
                <div key={open.day}>Day {open.day}: {open.start} - {open.end} &nbsp; Overnight: {hours[0].is_overnight ? 'Yes' : 'No'}</div>
              )
            }) :
            null
          }
          <div>Open: {hours && hours[0].is_open_now ? 'Yes' : 'No'}</div>
          {
            categories ?
            <div>Category Name: {categories[0].title}</div> :
            null
          }
        </div>
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="d-block w-100" src={photos ? photos[0] : "..."} alt="First slide" />
              <div className="carousel-caption d-none d-md-block">
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src={photos ? photos[1] : "..."} alt="Second slide" />
              <div className="carousel-caption d-none d-md-block">
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src={photos ? photos[2] : "..."} alt="Third slide" />
              <div className="carousel-caption d-none d-md-block">
                <h3>Third slide label</h3>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
              </div>
            </div>
          </div>
          <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
        <a className="btn btn-primary btn-lg" href="#" role="button">JOIN</a>
        <a className="btn btn-primary btn-lg" href="#" role="button">FOLLOW</a>
      </div>
    )
  }
}

const mapState = state => ({
  event: state.event.singleYelpEvent
})

const mapDispatch = dispatch => ({
  fetchYelpEvent(id) {
    dispatch(fetchYelpEvent(id))
  },
  joinEvent() {

  },
  followEvent() {

  }
})

export default connect(mapState, mapDispatch)(SingleYelpEventInLocation)
