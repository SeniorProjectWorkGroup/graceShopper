const router = require('express').Router()
const {LineItem, Product} = require('../db/models')
module.exports = router

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
    const lineItem = await LineItem.findOrCreate({
      where: {
        productId: req.body.productId,
        cartId: req.body.cartId
      },
      defaults: {
        cartId: req.body.cartId,
        quantity: 1
      }
    }).spread(async (item, created) => {
      if (!created) {
        const quantity = item.quantity + 1
        await item.update({quantity})
      }
      return item
    })
    res.json({
      message: 'Item Created',
      lineItem
    })
  } catch (err) {
    next(err)
  }
})
