const router = require('express').Router()
const {Review, User} = require('../db/models')

module.exports = router

// Get all reviews
router.get('/', async (req, res, next) => {
  try {
    const reviews = await Review.findAll()
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})

// Get all reviews for a particular product
router.get('/product/:productId', async (req, res, next) => {
  try {
    // console.log('req.params.productId:', req.params.productId)
    const options = {
      where: {
        productId: req.params.productId
      },
      // Eager load the users. Will have to filter out all info except name
      include: [User]
    }
    const productReviews = await Review.findAll(options)
    // Filter out all user info except for their name
    for (let i = 0; i < productReviews.length; i++) {
      const review = productReviews[i]
      review.user = { name: review.user.name }
    }
    res.json(productReviews)
  } catch (err) {
    next(err)
  }
})

// Get all reviews for a particular user
router.get('/user/:userId', async (req, res, next) => {
  try {
    const options = {
      where: {
        userId: req.params.userId
      }
    }
    const userReviews = await Review.findAll(options)
    res.json(userReviews)
  } catch (err) {
    next(err)
  }
})

// User posts a review for a product
router.post('/product/:productId', async (req, res, next) => {
  try {
    const productId = req.params.productId
    // TODO
  } catch (err) {
    next(err)
  }
})
