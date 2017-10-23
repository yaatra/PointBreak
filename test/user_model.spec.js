const {expect} = require('chai')
const db = require('../server/db')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  var user

  beforeEach(function(){
    user = User.build({
      firstName: 'Eren',
      lastName: 'Chen',
      email: 'eren@gmail.com',
      gender: 'male',
      bmi: '24.4',
      isAdmin: false,
      isProfessional: false
    })
  })

  afterEach(function () {
    return Promise.all([
      User.truncate({ cascade: true })
    ])
  })

  describe('attributes definition', function(){
    it('includes `firstname` and `lastName` fields', function () {

      return user.save()
      .then(function (savedUser) {
        expect(savedUser.firstName).to.equal('Eren')
        expect(savedUser.lastName).to.equal('Chen')
      })
    })

    it('requires `email`', function () {

      user.email = null

      return user.validate()
      .then(function () {
        throw new Error('validation should fail when email is null')
      },
      function(result) {
        expect(result).to.be.an.instanceOf(Error)
      })
    })

    it('requires `gender`', function () {

      user.gender = null

      return user.validate()
      .then(function () {
        throw new Error('validation should fail when gender is null')
      },
      function (result) {
        expect(result).to.be.an.instanceOf(Error)
      })
    })

    it('defaults `isAdmin` and `isProfessional` to false', function () {

      return user.save()
      .then(function (savedUser) {
        expect(savedUser.isAdmin).to.equal(false)
        expect(savedUser.isProfessional).to.equal(false)
      })
    })
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(() => {
        return User.create({
          email: 'cody@puppybook.com',
          password: 'bones'
        })
          .then(user => {
            cody = user
          })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
