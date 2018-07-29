const router = require('express').Router()
const {Review} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const reviews = await Review.findAll()
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})

router.get('/product/:productId', async (req, res, next) => {
  try {
    // console.log('req.params.productId:', req.params.productId)
    const whereClause = {
      where: {
        productId: req.params.productId
      }
    }
    const productReviews = await Review.findAll(whereClause)
    res.json(productReviews)
  } catch (err) {
    next(err)
  }
})

router.get('/user/:userId', async (req, res, next) => {
  try {
    const whereClause = {
      userId: req.query.params.userId
    }
    const userReviews = await Review.findAll(whereClause)
    res.json(userReviews)
  } catch (err) {
    next(err)
  }
})
