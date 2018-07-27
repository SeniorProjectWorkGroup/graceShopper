const {expect} = require('chai')
const db = require('../index')
const LineItem = db.model('lineitem')
const Product = db.model('product')
const Cart = db.model('cart')

describe('LineItem Model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  describe('creation', () => {
    let item
    beforeEach(async () => {
      const cart = await Cart.create({name: 'A test cart'})
      const product = await Product.create({
        description: 'A dummy product',
        name: 'DummyProduct',
        numInStock: 3
      })
      item = await LineItem.create({
        productId: 1,
        cartId: 1
      })
    })
    it('defaults quantity to 1', () => {
      expect(item.quantity).to.equal(1)
    })
  })
})
