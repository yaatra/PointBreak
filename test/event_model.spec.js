const {expect} = require('chai')
const db = require('../server/db')
const Event = db.model('event')

describe('Event model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  var description = 'The Marathon des Sables is the stuff of legends. It is The Toughest Footrace on Earth (Discovery Channel). MdS is a truly gruelling multi-stage adventure through a mythical landscape in one of the world’s most inhospitable environments – the Sahara desert.'

  var event
  var day = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
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
    it('includes `name` and `description` fields', function () {
      return event.save()
      .then(function (savedEvent) {
        expect(savedEvent.name).to.equal('Marathon des Sables')
        expect(savedEvent.description).to.equal(description)
      })
    })

    it('checks `weekday`', function () {
      event.day = 'Holiday'

      return event.validate()
      .then(function () {
        throw new Error('validation should fail when gender is null')
      },
      function (result) {
        expect(result).to.be.an.instanceOf(Error)
      })
    })

    it('requires `image` (in a more strict way than for `allowNull: false`)', function () {
      event.image = 'marathondessables.co.uk/wp-content/uploads/2015/12/marathon.jpg'

      return event.validate()
      .then(function () {
        throw new Error('validation should fail when image is non-url')
      },
      function (result) {
        expect(result).to.be.an.instanceOf(Error)
        expect(result.message).to.contain('Validation error')
      })
    })

    it('can handle long `description`', function() {
      var description = 'The adventure began back in 1977, when Thierry Sabine got lost on his motorbike in the Libyan desert during the Abidjan-Nice Rally. Saved from the sands in extremis, he returned to France still in thrall to this landscape and promising himself he would share his fascination with as many people as possible. He proceeded to come up with a route starting in Europe, continuing to Algiers and crossing Agadez before eventually finishing at Dakar. The founder coined a motto for his inspiration: "A challenge for those who go. A dream for those who stay behind." Courtesy of his great conviction and that modicum of madness peculiar to all great ideas, the plan quickly became a reality. Since then, the Paris-Dakar, a unique event sparked by the spirit of adventure, open to all riders and carrying a message of friendship between all men, has never failed to challenge, surprise and excite. Over the course of almost thirty years, it has generated innumerable sporting and human stories.'

      return Event.create({
        name: 'Paris Dakar',
        description: description,
        image:
        'https://s-media-cache-ak0.pinimg.com/originals/26/32/ae/2632ae81202f4ca83a2435b1697ebab5.jpg',
        day: 'Tuesday'
      })
      .then(function(result) {
        expect(result).to.be.an('object')
        expect(result.name).to.equal('Paris Dakar')
        expect(result.image).to.equal('https://s-media-cache-ak0.pinimg.com/originals/26/32/ae/2632ae81202f4ca83a2435b1697ebab5.jpg')
        expect(result.day).to.equal('Tuesday')
      })
    })
  })
}) // end describe('User model')
