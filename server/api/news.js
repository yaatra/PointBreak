const axios = require("axios")
const router = require('express').Router()

module.exports = router

// Create the authorization object
const newsapi = process.env.NEWS_API_KEY

// One business
router.get('/', (req, res, next) => {
  axios.get(`https://newsapi.org/v1/articles?source=bbc-sport&sortBy=top&apiKey=${newsapi}`)
  .then(res => res.data)
    .then(news => res.json(news))
    .catch(next)
})
