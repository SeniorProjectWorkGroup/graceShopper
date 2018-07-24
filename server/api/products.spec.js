/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
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

    it('POST creates a new product & responds with the created product', () => {
      return (
        request(app)
          .post('/api/products')
          .send({
            name: 'product',
            numInStock: 3,
            description: 'it is a product'
          }) // the HTTP request body
          // .expect('Content-Type', /json/)
          .expect(res => {
            expect(res.body.name).to.eql('product')
            expect(res.body.description).to.eql('it is a product')
          })
      )
    })

    it('PUT /api/products/:productId', () => {
      return request(app)
        .put('/api/products/1')
        .send({
          name: 'product',
          numInStock: 3,
          description: 'it is a product'
        })
        .expect(res => {
          expect(res.body.productToChange.name).to.be.equal('product')
          expect(res.body.message).to.be.equal('Product Updated')
        })
    })

    it('DELETE /api/products/:productId', () => {
      return request(app)
        .delete('/api/products/1')
        .expect(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.message).to.be.equal('Product Deleted')
        })
    })
  }) // end describe('/api/products')
}) // end describe('Product routes')
