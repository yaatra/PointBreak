const Sequelize = require('sequelize')
const db = require('../db')

const Activity = db.define('activity', {
  name: {
    type: Sequelize.STRING
  },
  image: {
    type: Sequelize.STRING(1234),
    isUrl: true
  }
})

module.exports = Activity
