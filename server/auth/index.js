const router = require('express').Router()
const User = require('../db/models/user')
const Destination = require('../db/models/destination')
const AssociatedLanguage = require('../db/models/associatedLanguage')
const PreferredCategory = require('../db/models/preferredCategory')
const PreferredDestination = require('../db/models/preferredDestination')
module.exports = router

router.post('/login', (req, res, next) => {
  User.findOne({
    where: {email: req.body.email},
    // include: [{all: true, nested: true}]
  })
    .then(user => {
      if (!user) {
        res.status(401).send('User not found')
      } else if (!user.correctPassword(req.body.password)) {
        res.status(401).send('Incorrect password')
      } else {
        req.login(user, err => err ? next(err) : res.json(user))
      }
    })
    .catch(next)
})

router.post('/signup', (req, res, next) => {
  console.log(req.body)
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const email = req.body.email
  const password = req.body.password
  const height = Number(req.body.height)
  const weight = Number(req.body.weight)
  const age = Number(req.body.age)
  const gender = req.body.gender
  const selectedLanguages = req.body.selectedLanguages
  const selectedCategories = req.body.selectedCategories
  const selectedLocations = req.body.selectedLocations
  // const bmi = (703 * (weight) / (height * 12) * (height * 12)).toFixed(1)

  const user = {firstName, lastName, email, password, height, weight, age, gender}
  User.findOrCreate({
    where: {email},
    defaults: user
  })
    .spread((user, created) => {
      if (!created) {
        user.update({password, height, weight, age, gender})
      }

      user.update({weight, height, age, gender})
      selectedLanguages.forEach(selectedLanguage => {
        AssociatedLanguage.create({
          userId: user.id,
          languageId: +selectedLanguage
        })
      })

      selectedCategories.forEach(selectedCategory => {
        PreferredCategory.create({
          userId: user.id,
          categoryId: +selectedCategory
        })
      })

      selectedLocations.forEach(selectedLocation => {
        const cityStateCountryArr = selectedLocation.address.split(', ')
        const city = cityStateCountryArr[0]
        const state = cityStateCountryArr[1]
        const country = cityStateCountryArr[2]
        const cityStateCountryObj = {city, state, country}
        Destination.findOrCreate({
          where: {
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng
          },
          defaults: cityStateCountryObj
        })
        .then((destination, created) => {
          PreferredDestination.create({
            userId: user.id,
            destinationId: destination[0].id
          })
        })
      })

      req.login(user, err => err ? next(err) : res.json(user))
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError')
        res.status(401).send('User already exists')
      else next(err)
    })
})

router.post('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))

router.use('/fitbit', require('./fitbit'))
