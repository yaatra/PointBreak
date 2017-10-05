const passport = require('passport')
const router = require('express').Router()
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const {User} = require('../db/models')
module.exports = router

/**
 * For OAuth keys and other secrets, your Node process will search
 * process.env to find environment variables. On your production server,
 * you will be able to set these environment variables with the appropriate
 * values. In development, a good practice is to keep a separate file with
 * these secrets that you only share with your team - it should NOT be tracked
 * by git! In this case, you may use a file called `secrets.js`, which will
 * set these environment variables like so:
 *
 * process.env.GOOGLE_CLIENT_ID = 'your google client id'
 * process.env.GOOGLE_CLIENT_SECRET = 'your google client secret'
 * process.env.GOOGLE_CALLBACK = '/your/google/callback'
 */

const googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK
}

const strategy = new GoogleStrategy(googleConfig, (token, refreshToken, profile, done) => {
  console.log('*************Profile****************', profile)
  const googleId = profile.id
  const name = profile.name
  const firstName = name.givenName
  const lastName = name.familyName
  const email = profile.emails[0].value
  const avatar = profile.photos[0].value

  const info = {firstName, lastName, email, avatar, googleId}

  User.findOrCreate({
    where: {email},
    defaults: info
  })
  .spread((user, created) => {
    done(null, user)
  })
  .catch(done)
})

passport.use(strategy)

router.get('/', passport.authenticate('google', {scope: 'email'}))

router.get('/callback', passport.authenticate('google', {
  successRedirect: '/home',
  failureRedirect: '/login'
}))
