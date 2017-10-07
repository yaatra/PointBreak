const router = require('express').Router()
const {Event, AssociatedEvent} = require('../db/models')
module.exports = router

// Get all events
router.get('/', (req, res, next) => {
  Event.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    include: [{
      all: true,
    //   nested: true
    }]
  })
  .then(events => res.json(events))
  .catch(next)
})

// Get all events for a specific location
router.get('/locations', (req, res, next) => {
  // WE NEED TO DO A BETTER ADDRESS MATCHING HERE (VER 2.0)
  // FOR NOW IT IS AN EXACT MATCH to the location in the Event Model
  Event.findAll({
    where: {location: req.query.address},
    include: [{
      all: true,
      //nested: true
    }]
  })
  .then(events => res.json(events))
  .catch(next)
})

// Get all events for a specific user
// ** SORT OF WORKS - BUT BOT
router.get('/user/:id', (req, res, next) => {
  AssociatedEvent.findAll({
    where: {
      userId: req.params.id
    },
    include: [Event]
  })
  .then(res.json.bind(res))
  .catch(next)
})

// Get one events
router.get('/:id', (req, res, next) => {
  Event.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      all: true,
      //nested: true
    }]
  })
  .then(event => res.json(event))
  .catch(next)
})

// Create an event
router.post('/:userId', (req, res, next) => {
  Event.create(req.body)
  .then((event) => {
    AssociatedEvent.findOrCreate({
      where: {
        userId: req.params.userId,
        eventId: event.id,
        type: 'created'
      }
    })
  })
  .then(event => res.json(event))
  .catch(next)
})

router.post('/join', (req, res, next) => {
  AssociatedEvent.findOrCreate({
    where: {
      userId: req.body.userId,
      eventId: req.body.eventId
    },
    defaults: {
      type: req.body.type
    }
  })
  .then((event, created) => {
    if (!created && event.type === 'created') {
      event[0].update({
        type: req.body.type
      }, {
        fields: ['type'],
        returning: true
      })
      .then(event => res.json(event))
    } else if (!created && event.type === 'followed') {
      AssociatedEvent.created(req.body)
      .then(event => res.json(event))
    }

    return event[0]
  })
  .then(event => res.json(event))
  .catch(next)
})

router.post('/follow', (req, res, next) => {
  AssociatedEvent.findOrCreate({
    where: {
      userId: req.body.userId,
      eventId: req.body.eventId
    },
    defaults: {
      type: req.body.type
    }
  })
  .then((event, created) => {
    if (!created && event.type === 'created') {
      event[0].update({
        type: req.body.type
      }, {
        fields: ['type'],
        returning: true
      })
      .then(event => res.json(event))
    } else if (!created && event.type === 'pendingJoin') {
      AssociatedEvent.created(req.body)
      .then(event => res.json(event))
    }

    return event[0]
  })
  .then(event => res.json(event))
  .catch(next)
})

// Update an event
router.put('/:id', (req, res, next) => {
  Event.update(req.body, {
    where: {
      id: req.params.id
    },
    returning: true
  })
  .then(result => {
    const event = result[1][0]
    res.json(event)
  })
  .catch(next)
})

// Delete an events
router.delete('/:eventId/:userId', (req, res, next) => {
  AssociatedEvent.destroy({
    where: {
      eventId: req.params.eventId
    }
  })
  .then(() => {
    Event.destroy({
      where: {
        id: req.params.eventId
      }
    })
  })
  .then(function() {
    res.sendStatus(200)
  })
  .catch(next)
})
