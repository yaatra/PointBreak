const User = require('./user')
const Activity = require('./activity')
const Event = require('./event')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

Event.belongsTo(User)
User.hasMany(Event)

Event.belongsTo(Activity)
Activity.hasMany(Event)

module.exports = {
  User,
  Activity,
  Event
}
