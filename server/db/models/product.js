const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  numInStock: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL,
    validate: {
      min: 0
    }
  },
description: {
  type: Sequelize.TEXT,
  allowNull: false
},
imageUrls: {
  type: Sequelize.ARRAY(Sequelize.TEXT)
}
})


Product.findByCategory = async function(category) {
  return await Product.findAll({where:{categoryId: category}})
    }


module.exports = Product
