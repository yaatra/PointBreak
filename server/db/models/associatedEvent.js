const Sequelize = require('sequelize')
const db = require('../db')

const AssociatedEvent = db.define('associatedEvent', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  type: {
    type: Sequelize.ENUM('selected', 'followed')
  }
})

module.exports = AssociatedEvent
