const Sequelize = require('sequelize')
const db = require('../db')

const Event = db.define('event', {
  name: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  },
  image: {
    type: Sequelize.TEXT,
    isUrl: true
  },
  date: {
    type: Sequelize.DATE
  },
  day: {
    type: Sequelize.ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')
  },
  recurrence: {
    type: Sequelize.ENUM('one day', 'daily', 'weekly', 'monthly')
  },
  difficulty: {
    type: Sequelize.INTEGER,
    max: 10,
    min: 1
  },
  location: {
    type: Sequelize.TEXT
  },
  lat: {
    type: Sequelize.DOUBLE
  },
  lng: {
    type: Sequelize.DOUBLE
  }
})

module.exports = Event
