const User = require('./user')
const Category = require('./category')
const Product = require('./product')

const db = require('../db')

// Category.belongsToMany(Product, {through: 'Product-Category'})

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


 // *Have to explicitly create join table in order to seed / test it.
 // Can't get it to work otherwise
const ProductCategory = db.define('productcategory', {
});

Product.belongsToMany(Category, {through: ProductCategory})
Category.belongsToMany(Product, {through: ProductCategory})

module.exports = {
  User,
  Category,
  Product,
  ProductCategory
}
