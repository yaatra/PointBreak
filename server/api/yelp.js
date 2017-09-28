const axios = require("axios")
const router = require('express').Router()
module.exports = router
const accessToken = 'Bearer fAnTa0ggnBaIHU281A0SmVQzU2X04aRQnso39SkbKZrdK0vOOl_OkDIn0uErj93oe6wvlvagoWxucw8NiUgQdG1icdAxeF0jgKzw__eWkzw6dT1r-0NC4wR7c_7LWXYx'

// One business
router.get('/:id', (req, res, next) => {
  axios.get(`https://api.yelp.com/v3/businesses/${req.params.id}`, { 'headers': { 'Authorization': accessToken}})
  .then(res => res.data)
    .then(users => res.json(users))
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
  for (let i=0; i<total;i+=20){
    console.log(i)
    promiseList.push(
      (axios.get(`https://api.yelp.com/v3/businesses/search?location=new-york,category_filter=publicservicesgovt,landmarks,limit=50,offset=${i}`, { 'headers': { 'Authorization': accessToken}}))
      .then(res => res.data)
      .then(res => {
        console.log(i,'***********',res.businesses)
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

