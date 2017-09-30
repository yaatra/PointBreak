const router = require('express').Router()
const {Event} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Event.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    include: [{
      all: true,
      nested: true
    }]
  })
  .then(events => res.json(events))
  .catch(next)
})

router.get('/:id', (req, res, next) => {
  Event.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      all: true,
      nested: true
    }]
  })
  .then(event => res.json(event))
  .catch(next)
})

router.post('/', (req, res, next) => {
  Event.create(req.body)
  .then(event => res.json(event))
  .catch(next)
})

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

router.delete('/:id', (req, res, next) => {
  Event.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(function() {
    res.sendStatus(200)
  })
  .catch(next)
})
