const axios = require("axios")
const router = require('express').Router()

module.exports = router


// Create the authorization object
const yelpAuth = {'headers': { 'Authorization': process.env.YELP_ACCESS_TOKEN}}

// One business
router.get('/:id', (req, res, next) => {
  axios.get(`https://api.yelp.com/v3/businesses/${req.params.id}`, yelpAuth)
  .then(res => res.data)
    .then(business => res.json(business))
    .catch(next)
})

// 100 businesses by location, and category
// WE NEED TO MAKE LOCATION And CATEGORY DYNAMIC
router.get('/', (req, res, next) => {
  let returnData = {
    businesses: [],
    total: 0,
    region: {}
  }
  let promiseList = []
  let total = 100
  // We need this 'cos Yelp only gives us 20 items at a time
  for (let i = 0; i < total; i += 50){
    promiseList.push(
      (axios.get(`https://api.yelp.com/v3/businesses/search?location=new-york,term=extreme+sport,limit=50,offset=${i}`, yelpAuth))
      .then(res => res.data)
      .then(res => {
        returnData.businesses = [...returnData.businesses, ...res.businesses]
        returnData.total = res.total || 0
        total = res.total
        returnData.region = res.region
      })
    )
  }

  //Resolve the collected promises
  Promise.all(promiseList)
  .then(res => res.data)
  .then(() => res.json(returnData))
  .catch(next)
})


router.get('/:lat/:lng', (req, res, next) => {
  let returnData = {
    businesses: [],
    total: 0,
    region: {}
  }
  let promiseList = []
  // let total = 20
  // We need this 'cos Yelp only gives us 20 items at a time
  // for (let i = 0; i < total; i += 20){
    promiseList.push(
      (axios.get(`https://api.yelp.com/v3/businesses/search?latitude=${req.params.lat}&longitude=${req.params.lng}&category=active&radius=40000&limit=20`, yelpAuth))
      .then(res => res.data)
      .then(res => {
        returnData.businesses = [...returnData.businesses, ...res.businesses]
        returnData.total = res.total || 0
        total = res.total
        returnData.region = res.region
      })
    )
  // }
  //Resolve the collected promises
  Promise.all(promiseList)
  .then(res => res.data)
  .then(() => res.json(returnData))
  .catch(next)
})
