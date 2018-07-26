const router = require('express').Router()
const {LineItem, Cart} = require('../db/models')
module.exports = router

router.use('/:cartId/item', require('./lineItem'))

//get items in a cart
router.get('/:cartId', (req, res, next) => {
  try {
    const cartItems = LineItem.findAll({
      where: {
        cartId: req.params.cartId
      }
    })
    res.json(cartItems)
  } catch (err) {
    next(err)
  }
})

//delete a cart
router.delete('/:cartId', async (req, res, next) => {
  try {
    const targetCart = await Cart.findById(req.params.cartId)
    await targetCart.destroy
    res.json({message: 'Cart has been deleted'})
  } catch (err) {
    next(err)
  }
})

// Need to manage adding user id if unauth
router.post('/', async (req, res, next) => {
  try {
    const newCart = await Cart.create({
      // Check what is in req.user
      userId: req.user.id || null
    })
    res.json({message: 'Created Cart'})
  } catch (err) {
    next(err)
  }
})

router.put('/:cartId', async (req, res, next) => {
  try {
    const {userId} = req.body
    const updatedCart = await Cart.update({
      userId
    })
    res.json({
      message: 'Cart Updated',
      updatedCart
    })
  } catch (err) {
    next(err)
  }
})
