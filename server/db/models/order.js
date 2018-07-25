const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  addressAtPurchase: {
    type: Sequelize.STRING,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('notShipped', 'shipped'),
    defaultValue: 'notShipped'
  },
  totalItems: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1
    }
  },
  totalSale: {
    type: Sequelize.FLOAT,
    validate: {
      min: 0
    }
  },
  dateOfPurchase: {
    type: Sequelize.DATE
  }
})

module.exports = Order
