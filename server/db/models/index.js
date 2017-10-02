const User = require('./user')
const Event = require('./event')
const Category = require('./category')
const Destination = require('./destination')
const AssociatedEvent = require('./associatedEvent')
const PreferredCategory = require('./preferredCategory')
const PreferredDestination = require('./preferredDestination')

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

User.belongsToMany(Category, {through: PreferredCategory})
Category.belongsToMany(User, {through: PreferredCategory})

User.belongsToMany(Destination, {through: PreferredDestination})
Destination.belongsToMany(User, {through: PreferredDestination})

Event.belongsTo(Category)
Category.hasMany(Event)

Event.belongsTo(Destination)
Destination.hasMany(Event)

module.exports = {
  User,
  Event,
  Category,
  Destination,
  AssociatedEvent,
  PreferredCategory,
  PreferredDestination
}
