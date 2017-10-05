const router = require('express').Router()
const passport = require('passport')
const {User, Fitbit} = require('../db/models')
const FitbitStrategy = require( 'passport-fitbit-oauth2' ).FitbitOAuth2Strategy
const helper = require('./helper')

passport.use(new FitbitStrategy({
  clientID: process.env.FITBIT_CLIENT_ID,
  clientSecret: process.env.FITBIT_CLIENT_SECRET,
  callbackURL: process.env.FITBIT_CALLBACK
},
function(accessToken, refreshToken, profile, done) {
  console.log('*************Profile****************', profile)
  const fitbitId = profile.id
  const firstName = profile._json.user.firstName
  const lastName = profile._json.user.lastName
  const avatar = profile._json.user.avatar
  const height = profile._json.user.height
  const weight = profile._json.user.weight
  const age = profile._json.user.age
  const email = 'null'
  const bmi = weight / (height * height) * 703

  const userInfo = {firstName, lastName, email, avatar, height, weight, age, bmi, fitbitId}
  const fitbitInfo = {accessToken, refreshToken}

  User.findOrCreate({
    where: {fitbitId},
    defaults: userInfo
  })
  .spread((user, created) => {
    if (created) {
      return Fitbit.create(fitbitInfo)
      .then(fitbit => user.setFitbitInfo(fitbit))
      .then(user => user)
    } else {
      return user
    }
  })
  .then(userToLogin => {
    return userToLogin.getFitbitInfo()
    .then(fitbit => {
      // the tokens may change after a certain amount of time
      // here we are reassigning the refresh and access tokens
      fitbit.accessToken = accessToken
      fitbit.refreshToken = refreshToken

      const tokens = {accessToken: fitbit.accessToken, refreshToken: fitbit.refreshToken}

      helper.getActivityTimeSeries(tokens, {}, '1d', 'steps')
      .then(data => {
        var stepsData = data['activities-tracker-steps']
        console.log("****************One Day****************", stepsData)
      })

      helper.getActivityTimeSeries(tokens, {}, '1w', 'steps')
      .then(data => {
        var stepsData = data['activities-tracker-steps']
        console.log("*****************One Week****************", stepsData)
        const weekAverageSteps = stepsData.reduce((accumulator, day) => accumulator + Number(day.value), 0) / 7
        console.log("*****************Week Average Steps****************", weekAverageSteps)
        fitbit.update({weekAverageSteps})
        stepsData.forEach(day => {
          var dayData = {}
          var oneDay = day.dateTime.split('-')
          var year = Number(oneDay[0])
          var month = Number(oneDay[1]) - 1
          var dayDate = Number(oneDay[2])
          dayData.steps = Number(day.value)
          dayData.date = new Date(year, month, dayDate)
          fitbit.weekSteps.push(dayData)
        })
        fitbit.weekSteps = fitbit.weekSteps.reverse().slice(0, 7)
        var todaysSteps = fitbit.weekSteps[0].steps
        fitbit.steps = todaysSteps

        var currentDate = new Date()
        if (userToLogin.lastLoggedIn.getFullYear() !== currentDate.getFullYear()
        || userToLogin.lastLoggedIn.getDate() !== currentDate.getDate()
        || userToLogin.lastLoggedIn.getMonth() !== currentDate.getMonth()) {
          userToLogin.lastLoggedIn = currentDate
          userToLogin.lastLoggedInSteps = fitbit.steps
          fitbit.totalSteps += fitbit.steps
        }
        // update steps every time user logs in for that day
        if (userToLogin.lastLoggedIn.getFullYear() === currentDate.getFullYear()
        && userToLogin.lastLoggedIn.getDate() === currentDate.getDate()
        && userToLogin.lastLoggedIn.getMonth() === currentDate.getMonth()) {
          if (fitbit.totalSteps === 0) {
            fitbit.totalSteps += fitbit.steps
            userToLogin.lastLoggedInSteps = fitbit.steps
          } else {
            var newDifference = fitbit.steps - userToLogin.lastLoggedInSteps
            userToLogin.lastLoggedInSteps += newDifference
            fitbit.totalSteps += newDifference
          }
        }
      })

      helper.getActivityTimeSeries(tokens, {}, '1m', 'steps')
      .then(data => {
        var stepsData = data['activities-tracker-steps']
        console.log("*****************One Month****************", stepsData)
        const monthAverageSteps = stepsData.reduce((accumulator, day) => accumulator + Number(day.value), 0) / 30
        console.log("*****************Month Average Steps****************", monthAverageSteps)
        fitbit.update({monthAverageSteps})
        stepsData.forEach(day => {
          var dayData = {}
          var oneDay = day.dateTime.split('-')
          var year = Number(oneDay[0])
          var month = Number(oneDay[1]) - 1
          var dayDate = Number(oneDay[2])
          dayData.steps = Number(day.value)
          dayData.date = new Date(year, month, dayDate)
          fitbit.weekSteps.push(dayData)
        })
      })

      helper.getActivityTimeSeries(tokens, {}, '3m', 'steps')
      .then(data => {
        var stepsData = data['activities-tracker-steps']
        console.log("****************Three Month****************", stepsData)
        const threeMonthAverageSteps = stepsData.reduce((accumulator, day) => accumulator + Number(day.value), 0) / 90
        console.log("*****************Three Month Average Steps****************", threeMonthAverageSteps)
        fitbit.update({threeMonthAverageSteps})
        stepsData.forEach(day => {
          var dayData = {}
          var oneDay = day.dateTime.split('-')
          var year = Number(oneDay[0])
          var month = Number(oneDay[1]) - 1
          var dayDate = Number(oneDay[2])
          dayData.steps = Number(day.value)
          dayData.date = new Date(year, month, dayDate)
          fitbit.weekSteps.push(dayData)
        })
      })

      helper.getActivityTimeSeries(tokens, {}, '6m', 'steps')
      .then(data => {
        var stepsData = data['activities-tracker-steps']
        console.log("****************Six Month****************", stepsData)
        const sixMonthAverageSteps = stepsData.reduce((accumulator, day) => accumulator + Number(day.value), 0) / 180
        console.log("*****************Six Month Average Steps****************", sixMonthAverageSteps)
        fitbit.update({sixMonthAverageSteps})
        stepsData.forEach(day => {
          var dayData = {}
          var oneDay = day.dateTime.split('-')
          var year = Number(oneDay[0])
          var month = Number(oneDay[1]) - 1
          var dayDate = Number(oneDay[2])
          dayData.steps = Number(day.value)
          dayData.date = new Date(year, month, dayDate)
          fitbit.weekSteps.push(dayData)
        })
      })

      helper.getActivityTimeSeries(tokens, {}, '1y', 'steps')
      .then(data => {
        var stepsData = data['activities-tracker-steps']
        console.log("****************One Year****************", stepsData)
        const oneYearAverageSteps = stepsData.reduce((accumulator, day) => accumulator + Number(day.value), 0) / 365
        console.log("*****************One Year Average Steps****************", oneYearAverageSteps)
        fitbit.update({oneYearAverageSteps})
        stepsData.forEach(day => {
          var dayData = {}
          var oneDay = day.dateTime.split('-')
          var year = Number(oneDay[0])
          var month = Number(oneDay[1]) - 1
          var dayDate = Number(oneDay[2])
          dayData.steps = Number(day.value)
          dayData.date = new Date(year, month, dayDate)
          fitbit.weekSteps.push(dayData)
        })
      })
      done(null, userToLogin)
    })
  })
  .catch(done)
}))

router.get('/', passport.authenticate('fitbit', {scope: ['activity', 'heartrate', 'location', 'profile']}))

router.get( '/callback', passport.authenticate('fitbit', {
  successRedirect: '/home',
  failureRedirect: '/login'
}))

module.exports = router
