const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  addressAtPurchase: {
    type: Sequelize.STRING,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('CREATED', 'PROCESSING', 'CANCELED', 'COMPLETE'),
    defaultValue: 'CREATED'
  },
  totalItems: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1
    }
  },
  totalSale: {
    type: Sequelize.FLOAT,
    min: 0
  },
  dateOfPurchase: {
    type: Sequelize.DATE
  },
  userId: {
    type: Sequelize.INTEGER
  }
})

module.exports = Order

// UTILIZE GETTER ASYNC TO GRAB DATA FROM PROD/ORDER TABLE
