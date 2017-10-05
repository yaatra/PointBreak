const router = require('express').Router()
const {Language} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Language.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    include: [{
      all: true,
      nested: true
    }]
  })
  .then(languages => res.json(languages))
  .catch(next)
})
