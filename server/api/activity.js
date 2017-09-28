const router = require('express').Router()
const {Activity} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Activity.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    include: [{
      all: true,
      nested: true
    }]
  })
    .then(activities => res.json(activities))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Activity.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      all: true,
      nested: true
    }]
  })
    .then(activity => res.json(activity))
    .catch(next)
})
