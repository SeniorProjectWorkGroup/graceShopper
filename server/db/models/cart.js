const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('Cart', {
  name: {
    type: Sequelize.STRING
  }
})

module.exports = Cart
