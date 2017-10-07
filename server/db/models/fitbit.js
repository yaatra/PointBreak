const Sequelize = require('sequelize')
const db = require('../db')

const Fitbit = db.define('fitbit', {
  accessToken: {
    type: Sequelize.TEXT
  },
  refreshToken: {
    type: Sequelize.TEXT
  },
  steps: {
    type: Sequelize.INTEGER
  },
  weekAverageSteps: {
    type: Sequelize.INTEGER
  },
  monthAverageSteps: {
    type: Sequelize.INTEGER
  },
  threeMonthAverageSteps: {
    type: Sequelize.INTEGER
  },
  sixMonthAverageSteps: {
    type: Sequelize.INTEGER
  },
  oneYearAverageSteps: {
    type: Sequelize.INTEGER
  },
  totalSteps: {
    type: Sequelize.INTEGER
  },
  weekStepsDate: {
    type: Sequelize.DATE
  },
  weekSteps: {
    type: Sequelize.ARRAY(Sequelize.JSON),
    defaultValue: []
  }
})

module.exports = Fitbit
