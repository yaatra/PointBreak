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
    type: Sequelize.STRING(1234),
    isUrl: true
  },
  location: {
    type: Sequelize.STRING
  },
  date: {
    type: Sequelize.DATE
  },
  difficulty: {
    type: Sequelize.INTEGER,
    max: 10,
    min: 1
  }
})

module.exports = Event
