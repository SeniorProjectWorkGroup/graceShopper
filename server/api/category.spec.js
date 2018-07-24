const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Category = db.model('category')

describe('Category Routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/categories', () => {
    const dummyCategory = {
      name: 'Paintings'
    }
    beforeEach(async () => {
      await Category.create(dummyCategory)
    })

    it('GET /api/categories', async () => {
      const res = await request(app)
        .get('/api/categories')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal('Paintings')
    })

    it('POST /api/categories', async () => {
      return request(app)
        .post('/api/categories')
        .send({name: 'Trees'})
        .expect(res => {
          expect(res.body.category).to.be.an('object')
          expect(res.body.category.name).to.be.equal('Trees')
        })
    })
  })
  describe('/api/categories/:categoryId', () => {
    const dummyCategory = {
      name: 'Paintings'
    }
    beforeEach(async () => {
      await Category.create(dummyCategory)
    })

    it('PUT /api/categories/:categoryId', () => {
      return request(app)
        .put('/api/categories/1')
        .send({name: 'Trees'})
        .expect(res => {
          expect(res.body.name).to.be.equal('Trees')
          expect(res.body.message).to.be.equal('Category Updated')
        })
    })

    it('DELETE /api/categories/:categoryId', () => {
      return request(app)
        .delete('/api/categories/1')
        .expect(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.message).to.be.equal('Category Deleted')
        })
    })
  })
})
