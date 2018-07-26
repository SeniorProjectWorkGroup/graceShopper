const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/categories', require('./category'))
router.use('/products', require('./products'))
router.use('/cart', require('./cart'))
router.use('/orders', require('./orders'))
router.use('/reviews', require('./reviews'))
router.use('/items', require('./lineItem'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
