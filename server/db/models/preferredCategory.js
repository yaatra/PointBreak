const Sequelize = require('sequelize')
const db = require('../db')

const PreferredCategory = db.define('preferredCategory', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
})

module.exports = PreferredCategory
