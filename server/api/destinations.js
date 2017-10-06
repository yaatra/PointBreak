const router = require('express').Router()
const {Destination} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Destination.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    include: [{
      all: true,
      //nested: true
    }]
  })
  .then(destinations => res.json(destinations))
  .catch(next)
})

router.get('/:id', (req, res, next) => {
  Destination.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      all: true,
      //nested: true
    }]
  })
  .then(destination => res.json(destination))
  .catch(next)
})
