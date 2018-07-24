/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
// const supertest = require('supertest-as-promised')(require('../app'))
const db = require('../db')
const app = require('../index')
const Product = db.model('product')
const Category = db.model('category')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    const dummyProduct = {
      name: 'Happy Tree',
      numInStock: 10,
      description: 'it is a tree which is happy'
    }
    const dummyCategory = {
      name: 'stuff'
    }

    beforeEach(async () => {
      console.log(dummyProduct)
      await Product.create(dummyProduct)
      await Category.create(dummyCategory)
    })

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal('Happy Tree')
    })

    // it('POST creates a new product & responds with the created product', () => {
    //   return supertest
    //     .post('/products')
    //     .send({name: 'product', description: 'it is a product'}) // the HTTP request body
    //     .expect('Content-Type', /json/)
    //     .expect(res => {
    //       expect(res.body).to.eql({
    //         name: 'product',
    //         description: 'it is a product'
    //       })
    // })
    // })
  }) // end describe('/api/products')
}) // end describe('Product routes')
