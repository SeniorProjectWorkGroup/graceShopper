const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')
const Cart = db.model('cart')
const LineItem = db.model('lineitem')
const User = db.model('user')

describe('Cart routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/:cartId/', () => {
    const dummyProduct = {
      name: 'Broadsword',
      numInStock: 1,
      description: 'A lovely Product'
    }
    const dummyCart = {
      name: 'My Special Cart'
    }
    const dummyLineItem = {
      productId: 1,
      cartId: 1,

      quantity: 3
    }
    const dummyUser = {
      email: 'dummy@dummyMail',
      role: 'ADMIN'
    }

    beforeEach(async () => {
      await Product.create(dummyProduct)
      await Cart.create(dummyCart)
      await LineItem.create(dummyLineItem)
      await User.create(dummyUser)
    })

    it('GET /api/cart/:cartId/', () => {
      return request(app)
        .get('/api/cart/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].quantity).to.be.equal(dummyLineItem.quantity)
        })
    })
    it('POST /api/cart/', () => {
      return request(app)
        .post('/api/cart')
        .send({
          name: 'A created Cart'
        })
        .expect(res => {
          expect(res.body.cart.name).to.equal('A created Cart')
        })
    })
    it('PUT /api/cart/:cartId', () => {
      return request(app)
        .put('/api/cart/1')
        .send({
          userId: 1
        })
        .expect(res => {
          expect(res.body.cart.userId).to.equal(1)
        })
    })
    it('DELETE /api/cart/:cartId', () => {
      return request(app)
        .delete('/api/cart/1')
        .expect(res => {
          expect(res.body.message).to.equal('Cart has been deleted')
        })
    })
  })
})
