import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const EventsList = props => {
    console.log("props:", props)
  const events = props.events;
  return (
    <div className="container">
      {events.map(event => {
          return (
              <div className='thumbnail col-sm-3' key={event.id}>
                  {event.name}
                  <hr/>
                  <img src={event.image} className='img-responsive' height='300' width='300'/>
              </div>
          )
      })}
    </div>
  );
};

export default EventsList