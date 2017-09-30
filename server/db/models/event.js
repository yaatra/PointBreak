const Sequelize = require('sequelize')
const db = require('../db')

const Event = db.define('event', {
  // id:{
  //   type: Sequelize.INTEGER,
  //   primaryKey: true,
  //   autoIncrement: true
  // },
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
    type: Sequelize.ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'),
    defaultValue: 'Monday'
  },
  recurrence: {
    type: Sequelize.ENUM('daily', 'weekly', 'monthly', 'one time'),
    defaultValue: 'one time'
  },
  difficulty: {
    type: Sequelize.INTEGER,
    max: 10,
    min: 1
  }
})

module.exports = Event
