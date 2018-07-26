const Sequelize = require('sequelize')
const db = require('../db')

const LineItem = db.define('lineitem', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
})

LineItem.findByProductId = async function(ProductId) {
  const items = await LineItem.findAll({
    where: {
      productId: ProductId
    }
  })
  return items
}

module.exports = LineItem
