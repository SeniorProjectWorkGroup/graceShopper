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
  // totalItems: {
  //   type: Sequelize.INTEGER,
  //   validate: {
  //     min: 1
  //   }
  // },
  // totalSale: {
  //   type: Sequelize.VIRTUAL,
  //   get() {
  //     return 5
  //   }
  // },
  dateOfPurchase: {
    type: Sequelize.DATE
  }
})

module.exports = Order

// UTILIZE GETTER ASYNC TO GRAB DATA FROM PROD/ORDER TABLE
