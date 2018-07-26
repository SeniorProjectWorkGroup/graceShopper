const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Cart = db.model('Cart')
const LineItem = db.model('LineItem')

describe('Line Item routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/:cartId/', () => {
    const dummyProduct = {
      id: 1,
      name: 'Broadsword',
      numInStock: 1
    }
    const dummyCart = {
      id: 1,
      name: 'My Special Cart'
    }
    const dummyLineItem = {
      productId: dummyProduct.id,
      CartId: dummyCart.id,
      quantity: 3
    }

    beforeEach(async () => {
      await LineItem.create(dummyLineItem)
    })

    it('GET /api/:cartId/', async () => {
      const res = await request(app)
        .get('/api/1/')
        .expect(200)
      console.log('Testing ')
      expect(res.body).to.be.an('array')
      expect(res.body[0].quantity[0]).to.be.equal(3)
    })
  })
})

// it('GET /api/products', async () => {
//   const res = await request(app)
//     .get('/api/products')
//     .expect(200)

//   expect(res.body).to.be.an('array')
//   expect(res.body[0].name).to.be.equal('Happy Tree')
// })
