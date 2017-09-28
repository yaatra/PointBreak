'use strict'
const database = require('./server/db')
const db = require('./server/db/models')
const User = db.User
const Activity = db.Activity
const Event = db.Event

//Create seed data
let data = {
  userData: [
    {firstName: 'Eren', lastName: 'Chen', email: 'eren@gmail.com', isAdmin: true, isProfessional: true, password: '123'},
    {firstName: 'Ranjeet', lastName: 'Sodhi', email: 'ranjeet@gmail.com', isAdmin: true, isProfessional: false, password: '123'},
    {firstName: 'Bojan', lastName: 'Jovanovic', email: 'bojan@gmail.com', isAdmin: true, isProfessional: true, password: '123'},
    {firstName: 'David', lastName: 'Eiber', email: 'david@gmail.com', isAdmin: true, isProfessional: false, password: '123'}
  ],
  activityData: [
    {name: 'Climbing', image: 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=0ahUKEwjw0K_n08jWAhUMVxQKHRVJBocQjRwIBw&url=https%3A%2F%2Fwww.outdoorgearlab.com%2Fclimbing&psig=AFQjCNFxL6nSNgJFeC-1CBSxU3Zw8wp90g&ust=1506714701662434'},
    {name: 'Skydiving', image: 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=0ahUKEwjx3qeD1MjWAhXHWhQKHR8QBFsQjRwIBw&url=http%3A%2F%2Fwww.skydiveharborsprings.com%2F&psig=AFQjCNHy6N3N4mwmN5hsoXLTPx4m7stebQ&ust=1506714751721889'},
    {name: 'Surfing', image: 'https://coresites-cdn.factorymedia.com/mpora_new/wp-content/uploads/2017/02/vladimir-kudinov-65978.jpg'},
    {name: 'Racing', image: 'https://cdn-2.motorsport.com/images/amp/2QbekwWY/s6/nascar-cup-fontana-2016-start-austin-dillon-richard-childress-racing-chevrolet-leads.jpg'},
  ],
  eventData: [
    {name: 'Race The Rabbit', image: 'https://i.ytimg.com/vi/x_CFMV_BSPE/maxresdefault.jpg', description: 'Racing event in Bangkok', location: 'Bangkok, Thailand', date: '2017-11-03 14:34:22', difficulty: '7', userId: 1, activityId: 1},
    {name: 'Paris Dakar', image: 'https://s-media-cache-ak0.pinimg.com/originals/26/32/ae/2632ae81202f4ca83a2435b1697ebab5.jpg', description: 'Race people down the most exciting parts of Paris Dakar route', location: 'Dakar, Senegal', date: '2017-10-15 14:00:00', difficulty: '5', userId: 2, activityId: 1},
    {name: 'Fly With Eagles', image: 'https://s-media-cache-ak0.pinimg.com/originals/c0/99/b1/c099b1b44e4737b30c19749a0554566b.jpg', description: 'Skydiving on shore of Pacific Ocean', location: 'Los Angeles, California', date: '2017-10-09 12:00:00', difficulty: '8', userId: 2, activityId: 2},
    {name: 'Jump the Hex', image: 'https://s7.favim.com/orig/150320/beach-happiness-happy-life-Favim.com-2579877.jpg', description: 'Experience the amazing Amazon Forrest views', location: 'Sao Paulo, Brazil', date: '2017-12-14 8:30:00', difficulty: '7', userId: 4, activityId: 2},
    {name: 'Surf the Dragon', image: 'https://travelmoredotph.files.wordpress.com/2016/05/surfing-photo-main.jpg?w=1200', description: 'Waves are outta control here!', location: 'Siargao Island, Philippines', date: '2018-01-18 10:15:00', difficulty: '4', userId: 2, activityId: 3},
    {name: 'Sharky Barky', image: 'https://travelmoredotph.files.wordpress.com/2016/05/surfing-photo-main.jpg?w=1200', description: 'Sharks are our best friends!', location: 'San Diego, California', date: '2018-01-18 10:15:00', difficulty: '4', userId: 3, activityId: 3},
    {name: 'Conquer Mount Blanc', image: 'http://ftpcontent.worldnow.com/kfmb/images/shark_sandiego1.jpg', description: 'Climbing Mt. Blanc', location: 'Milan, Italy', date: '2018-02-22 10:15:00', difficulty: '8', userId: 4, activityId: 1},
    {name: 'Everest base camp Expedition', image: 'http://nepalexpeditions.biz/wp-content/uploads/everest-base-camp-nepal-trek.jpg', description: 'Get to the base camp of towards Mt. Everest', location: 'Namche Bazaar, Nepal', date: '2018-04-22 07:15:00', difficulty: '6', userId: 4, activityId: 1}
  ]
}

//Force sync the db, and then create the data in the two tables.
User.sync({
  force: true
})
.then(() => {
  return Promise.all(
  data.userData.map(user => {
    return User.create(user)
  })
)})
.then(() => Activity.sync({
  force: true
}))
.then(() => {
  return Promise.all(
    data.activityData.map(activity => {
      return Activity.create(activity)
    })
)})
.then(() => Event.sync({
  force: true
}))
.then(() => {
  return Promise.all(
    data.eventData.map(event => {
      return Event.create(event)
    })
)})
.catch(err => console.error('There was totally a problem', err, err.stack))
.finally(() => {
  database.close()
  console.log('connection closed')
  return null
})
