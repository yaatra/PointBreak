const {expect} = require('chai')
const db = require('../server/db')
const Event = db.model('event')

describe('Event model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  var description = 'The Marathon des Sables is the stuff of legends. It is The Toughest Footrace on Earth (Discovery Channel). MdS is a truly gruelling multi-stage adventure through a mythical landscape in one of the world’s most inhospitable environments – the Sahara desert. You have to be self-sufficient and carry all your own food and equipment for the week on your back. Communal goat’s-hair Berber tents are pitched every night but, apart from that you have to take it with you. Water is rationed and if you exceed the ration, you get a time penalty.'

  beforeEach(function(){
    event = Event.build({
      name: 'Marathon des Sables',
      description: description,
      image: 'https://marathondessables.co.uk/wp-content/uploads/2015/12/marathon.jpg',
      day: 'Monday'
    })
  })

  afterEach(function () {
    return Promise.all([
      Event.truncate({ cascade: true })
    ])
  })

  describe('attributes definition', function(){
    it('includes `name` and `description` and `image` fields', function () {

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

    it('requires `isAdmin` and `isProfessional`', function () {

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
