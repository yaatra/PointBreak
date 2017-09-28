const axios = require("axios")
const router = require('express').Router()

module.exports = router

// Create the authorization object
const weatherUnderground = process.env.WEATHER_UNDERGROUND_API_KEY

// One business
router.get('/current/:state/:cityName/', (req, res, next) => {
  axios.get(`http://api.wunderground.com/api/${weatherUnderground}/conditions/q/${req.params.state}/${req.params.cityName}.json`)
  .then(res => res.data)
    .then(news => res.json(news))
    .catch(next)
})

router.get('/3day/:state/:cityName/', (req, res, next) => {
  axios.get(`http://api.wunderground.com/api/${weatherUnderground}/forecast/q/${req.params.state}/${req.params.cityName}.json`)
  .then(res => res.data)
    .then(news => res.json(news))
    .catch(next)
})

router.get('/10day/:state/:cityName/', (req, res, next) => {
  axios.get(`http://api.wunderground.com/api/${weatherUnderground}/forecast10day/q/${req.params.state}/${req.params.cityName}.json`)
  .then(res => res.data)
    .then(news => res.json(news))
    .catch(next)
})
