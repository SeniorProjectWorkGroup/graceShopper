const User = require('./user')
const Category = require('./category')
const Product = require('./product')
const Order = require('./order')
const Cart = require('./cart')
const LineItem = require('./lineItem')
const ProductOrder = require('./productOrder')
const Review = require('./review')

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

Product.belongsToMany(Category, {through: 'ProductCategory'})
Category.belongsToMany(Product, {through: 'ProductCategory'})

Order.hasMany(ProductOrder)
ProductOrder.belongsTo(Order)
Product.hasMany(ProductOrder)
ProductOrder.belongsTo(Product)
Order.belongsTo(User)

Product.hasMany(Review)
Review.belongsTo(Product)
User.hasMany(Review)
Review.belongsTo(User)

LineItem.belongsTo(Cart)
LineItem.belongsTo(Product)
Cart.hasOne(User)

module.exports = {
  Category,
  Order,
  Product,
  ProductOrder,
  Review,
  User,
  LineItem,
  Cart
}
