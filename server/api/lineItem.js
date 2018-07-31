const router = require('express').Router()
const {LineItem, Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const lineItems = await LineItem.findAll({
      where: {
        cartId: req.user.cartId
      },
      include: [Product]
    })
    res.json(lineItems)
  } catch (err) {
    next(err)
  }
})

router.get('/:itemId', async (req, res, next) => {
  try {
    const lineItem = await LineItem.findById(req.params.itemId)
    res.json(lineItem)
  } catch (err) {
    next(err)
  }
})

router.put('/:itemId', async (req, res, next) => {
  try {
    const {quantity} = req.body
    const lineItem = await LineItem.findById(req.params.itemId, {
      include: [Product]
    })
    const updatedItem = await lineItem.update({quantity})
    res.json(updatedItem)
  } catch (err) {
    next(err)
  }
})

router.delete('/:itemId', async (req, res, next) => {
  try {
    const lineItem = await LineItem.findById(req.params.itemId)
    await lineItem.destroy()
    res.json({
      message: 'Item Deleted'
    })
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    console.log('in lineitems.post. req.body:', req.body)
    // const {productId} = req.body
    // Get the cart for the user
    // req.user.id
    let [lineItem, created] = await LineItem.findOrCreate({
      where: {
        productId: req.body.productId,
        cartId: req.body.cartId
      },
      include: [Product],
      defaults: {
        cartId: req.body.cartId,
        quantity: 1
      }
    })
    // Eager loading doesn't work if we created it so we have to re-grab it from the db
    if (created) {
      lineItem = await LineItem.find({
        where: {
          productId: req.body.productId,
          cartId: req.body.cartId
        },
        include: [Product]
      })
    }
    console.log('in lineitems.post. lineItem:', lineItem, 'created:', created)
    if (!created) {
      const quantity = lineItem.quantity + 1
      await lineItem.update({quantity})
    }

    console.log('In lineitems.post. Added Item', lineItem)
    res.json(lineItem)
  } catch (err) {
    next(err)
  }
})
