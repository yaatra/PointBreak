const Sequelize = require('sequelize')
const db = require('../db')

const AssociatedLanguage = db.define('associatedLanguage', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
})

module.exports = AssociatedLanguage