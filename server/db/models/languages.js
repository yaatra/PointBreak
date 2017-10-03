const Sequelize = require('sequelize')
const db = require('../db')

const Language = db.define('Language', {
    code: {
        type: Sequelize.STRING,
    },
    name: {
        type: Sequelize.STRING,
    },
    nativeName: {
        type: Sequelize.STRING,
    }
})

module.exports = Language