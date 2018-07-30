const router = require('express').Router()
const {Order} = require('../db/models')
const {isAdmin, isUser} = require('./helper')
module.exports = router

//get all orders
router.get('/', async (req, res, next) => {
  try {
    if (!isAdmin(req)) throw new Error('User not authorized for get')
    const orders = await Order.findAll()
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

//get all orders for a specific user
router.get('/', async (req, res, next) => {
  try {
    if (!isUser(req)) throw new Error('User not authorized for get')
    const orders = await Order.findAll({where: {userId: req.user}})
    res.json(orders)
  } catch (err) {
    next(err)
  }
})
//get one specific order
router.get('/:orderId', async (req, res, next) => {
  try {
    if (!isUser(req)) throw new Error('User not authorized for get')
    const order = await Order.findById(req.params.orderId)
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  const {
    addressAtPurchase,
    status,
    totalItems,
    totalSale,
    dateOfPurchase
  } = req.body
  try {
    if (!isUser(req)) throw new Error('User not authorized for post')
    const order = await Order.create({
      addressAtPurchase,
      status,
      totalItems,
      totalSale,
      dateOfPurchase
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.put('/:orderId', async (req, res, next) => {
  const {addressAtPurchase, status} = req.body
  const changedOrder = {addressAtPurchase, status}
  try {
    if (!isAdmin(req)) throw new Error('User not authorized for put')
    const orderToChange = await Order.findById(req.params.orderId)
    await orderToChange.update(changedOrder)
    res.json({
      orderToChange: orderToChange,
      message: 'Order Updated'
    })
  } catch (err) {
    next(err)
  }
})

router.delete('/:orderId', async (req, res, next) => {
  try {
    if (!isAdmin(req)) throw new Error('User not authorized for delete')
    const order = await Order.findById(req.params.orderId)
    await order.destroy()
    res.json({order: order, message: 'Order Canceled'})
  } catch (err) {
    next(err)
  }
})
