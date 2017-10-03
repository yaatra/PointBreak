const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    // allowNull: false
  },
  password: {
    type: Sequelize.STRING
  },
  salt: {
    type: Sequelize.STRING
  },
  introduction: {
    type: Sequelize.TEXT
  },
  googleId: {
    type: Sequelize.STRING
  },
  lastLoggedIn: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  lastLoggedInSteps: {
    type: Sequelize.INTEGER
  },
  avatar: {
    type: Sequelize.TEXT
  },
  height: {
    type: Sequelize.DOUBLE
  },
  weight: {
    type: Sequelize.DOUBLE
  },
  age: {
    type: Sequelize.INTEGER
  },
  fitbitId: {
    type: Sequelize.STRING
  },
  bmi: {
    type: Sequelize.INTEGER
  },
  isAdmin: {
    type: Sequelize.BOOLEAN
  },
  isProfessional: {
    type: Sequelize.BOOLEAN
  }
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt) === this.password
}

/**
 * classMethods
 */
User.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function (plainText, salt) {
  return crypto.createHash('sha1').update(plainText).update(salt).digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password, user.salt)
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
