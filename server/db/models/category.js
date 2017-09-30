const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('category', {
  name: {
    type: Sequelize.STRING
  },
  image: {
    type: Sequelize.TEXT,
    isUrl: true
  }
})

module.exports = Category
