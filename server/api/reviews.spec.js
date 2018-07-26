/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')
const User = db.model('user')
const Review = db.model('review')

describe('Review routes', () => {
  beforeEach(async () => {
    await db.sync({force: true})
  })

  describe('/api/reviews/', () => {
    const dummyProducts = [
      {
        name: 'Happy Tree',
        numInStock: 10,
        description: 'it is a tree which is happy'
      },
      {
        name: 'Curlew, black',
        numInStock: 11,
        price: 348.21,
        description:
          'sed sagittis nam congue risus semper porta volutpat quam pede lobortis ligula sit',
        imageUrl: 'http://dummyimage.com/222x137.png/dddddd/000000'
      }
    ]
    const dummyUser = {
      email: 'cody@email.com',
      password: '123',
      role: 'SHOPPER'
    }
    const dummyReviews = [
      {
        title: 'Great product!',
        rating: 3.5,
        text:
          'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.',
        userId: 1,
        productId: 1
      },
      {
        title: 'Diverse homogeneous product',
        rating: 1,
        text:
          'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.\n\nCurabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
        userId: 1,
        productId: 2
      }
    ]

    beforeEach(async () => {
      await Product.bulkCreate(dummyProducts)
      await User.create(dummyUser)
      await Review.bulkCreate(dummyReviews)
    })

    it('GET /api/reviews', async () => {
      const res = await request(app)
        .get('/api/reviews')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body.length).to.be.equal(2)
      expect(res.body[0].title).to.be.equal('Great product!')
    })

    it('GET /api/reviews/product/1', async () => {
      const res = await request(app)
        .get('/api/reviews/product/1')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body.length).to.be.equal(1)
      expect(res.body[0].title).to.be.equal('Great product!')
    })

    // it('POST creates a new product & responds with the created product', () => {
    //   return (
    //     request(app)
    //       .post('/api/products')
    //       .send({
    //         name: 'product',
    //         numInStock: 3,
    //         description: 'it is a product'
    //       }) // the HTTP request body
    //       // .expect('Content-Type', /json/)
    //       .expect(res => {
    //         expect(res.body.name).to.eql('product')
    //         expect(res.body.description).to.eql('it is a product')
    //       })
    //   )
    // })

    // it('PUT /api/products/:productId', () => {
    //   return request(app)
    //     .put('/api/products/1')
    //     .send({
    //       name: 'product',
    //       numInStock: 3,
    //       description: 'it is a product'
    //     })
    //     .expect(res => {
    //       expect(res.body.productToChange.name).to.be.equal('product')
    //       expect(res.body.message).to.be.equal('Product Updated')
    //     })
    // })

    // it('DELETE /api/products/:productId', () => {
    //   return request(app)
    //     .delete('/api/products/1')
    //     .expect(res => {
    //       expect(res.body).to.be.an('object')
    //       expect(res.body.message).to.be.equal('Product Deleted')
    //     })
    // })
  })
})
