const router = require('express').Router()
const {LineItem, Cart, Product} = require('../db/models')
module.exports = router

//get items in a cart
router.get('/:cartId', async (req, res, next) => {
  try {
    const cartItems = await LineItem.findAll({
      where: {
        cartId: req.params.cartId
      },
      include: [Product]
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
    let userId
    if (req.user) userId = req.user.id
    else userId = null
    const {name} = req.body
    const newCart = await Cart.create({
      name,
      userId
    })
    res.json({message: 'Created Cart', cart: newCart})
  } catch (err) {
    next(err)
  }
})

router.put('/:cartId', async (req, res, next) => {
  try {
    const {userId} = req.body

    const targetCart = await Cart.findById(req.params.cartId)
    const updatedCart = await targetCart.update({
      userId
    })
    res.json({
      message: 'Cart Updated',
      cart: updatedCart
    })
  } catch (err) {
    next(err)
  }
})
