const Sequelize = require('sequelize')
const db = require('../db')

const Destination = db.define('destination', {
  city: {
    type: Sequelize.STRING
  },
  state: {
    type: Sequelize.STRING
  },
  country: {
    type: Sequelize.STRING
  },
  latitude: {
    type: Sequelize.DOUBLE
  },
  longitude: {
    type: Sequelize.DOUBLE
  }
})

module.exports = Destination
