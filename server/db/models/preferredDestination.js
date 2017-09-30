const Sequelize = require('sequelize')
const db = require('../db')

const PreferredDestination = db.define('preferredDestination', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
})

module.exports = PreferredDestination
