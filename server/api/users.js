const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    include: [{
      all: true,
      //nested: true
    }]
  })
  .then(users => res.json(users))
  .catch(next)
})

router.get('/:id', (req, res, next) => {
  User.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      all: true,
      //nested: true
    }]
  })
  .then(user => res.json(user))
  .catch(next)
})

router.post('/', (req, res, next) => {
  User.create(req.body)
  .then(user => res.json(user))
  .catch(next)
})

router.put('/:id', (req, res, next) => {
  User.update(req.body, {
    where: {
      id: req.params.id
    },
    returning: true
  })
  .then(result => {
    const user = result[1][0]
    res.json(user)
  })
  .catch(next)
})

router.delete('/:id', (req, res, next) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(function() {
    res.sendStatus(200)
  })
  .catch(next)
})
