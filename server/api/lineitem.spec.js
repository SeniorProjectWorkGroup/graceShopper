const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')
const Cart = db.model('cart')
const LineItem = db.model('lineitem')
const User = db.model('user')

describe.only('line-items api', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('routes', () => {
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
      await Product.create({
        name: 'Magic Wand',
        numInStock: 10,
        description: 'Another lovely product'
      })
      await Cart.create(dummyCart)
      await LineItem.create(dummyLineItem)
      await User.create(dummyUser)
    })
    it('GET /:itemId', () => {
      return request(app)
        .get('/api/items/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.quantity).to.be.equal(dummyLineItem.quantity)
          expect(res.body.cartId).to.be.equal(dummyLineItem.cartId)
          expect(res.body.productId).to.be.equal(dummyLineItem.productId)
        })
    })
    it('POST /items', () => {
      return request(app)
        .post('/api/items')
        .send({
          productId: 2,
          cartId: 1,
          quantity: 10
        })
        .expect(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.lineItem.quantity).to.be.equal(10)
          expect(res.body.lineItem.cartId).to.be.equal(
            dummyLineItem.lineItem.cartId
          )
          expect(res.body.lineItem.productId).to.be.equal(
            dummyLineItem.productId
          )
        })
    })
    // it('PUT /:item', () => {
    //   return request(app)
    //     .post('/api/items/1')
    //     .send({quantity: 11})
    //     .expect(res => {
    //       expect(res.body.quantity).to.be.equal(11)
    //       expect(res.body.cartId).to.be.equal(dummyLineItem.cartId)
    //       expect(res.body.productId).to.be.equal(dummyLineItem.productId)
    //     })
    // })
    // it('DELETE /:item', () => {
    //   return request(app)
    //   .delete('/api/items/1')
    //   .expect((res) => {
    //     expect(res.body.message).to.be.equal('Item Deleted')
    //   })
    // })
  })
})
