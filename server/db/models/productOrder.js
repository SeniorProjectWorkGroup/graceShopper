const Sequelize = require('sequelize')
const db = require('../db')

const ProductOrder = db.define('productOrder', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  priceAtPurchase: {
    type: Sequelize.FLOAT,
    validate: {
      min: 0
    }
  }
})

module.exports = ProductOrder
