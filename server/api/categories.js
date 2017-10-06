const router = require('express').Router()
const {Category} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Category.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    include: [{
      all: true,
      //nested: true
    }]
  })
  .then(categories => res.json(categories))
  .catch(next)
})

router.get('/:id', (req, res, next) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      all: true,
      //nested: true
    }]
  })
  .then(category => res.json(category))
  .catch(next)
})

router.post('/', (req, res, next) => {
  Category.create(req.body)
  .then(category => res.json(category))
  .catch(next)
})

router.put('/:id', (req, res, next) => {
  Category.update(req.body, {
    where: {
      id: req.params.id
    },
    returning: true
  })
  .then(result => {
    const category = result[1][0]
    res.json(category)
  })
  .catch(next)
})

router.delete('/:id', (req, res, next) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(function() {
    res.sendStatus(200)
  })
  .catch(next)
})
