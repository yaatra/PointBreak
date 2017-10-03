const Sequelize = require('sequelize')
const db = require('../db')

const AssociatedLanguage = db.define('associatedEvent', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
})

module.exports = AssociatedLanguage