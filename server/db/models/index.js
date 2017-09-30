const User = require('./user')
const Event = require('./event')
const Destination = require('./destination')
const Category = require('./category')
const AssociatedEvent = require('./associatedEvent')
const PreferredDestination = require('./preferredDestination')
const PreferredCategory = require('./preferredCategory')

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

User.belongsToMany(Event, {through: AssociatedEvent})
Event.belongsToMany(User, {through: AssociatedEvent})

User.belongsToMany(Destination, {through: PreferredDestination})
Destination.belongsToMany(User, {through: PreferredDestination})

User.belongsToMany(Category, {through: PreferredCategory})
Category.belongsToMany(User, {through: PreferredCategory})

Event.belongsTo(Category)
Category.hasMany(Event)

Event.belongsTo(Destination)

module.exports = {
  User,
  Event,
  Destination,
  Category,
  AssociatedEvent,
  PreferredDestination,
  PreferredCategory
}
