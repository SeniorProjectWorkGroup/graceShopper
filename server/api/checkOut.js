const router = require('express').Router()
// const {Checkout} = require('../db/models')
const stripe = require('stripe')('sk_test_TwTTlid3GeOG6YPydOjARw4I')

module.exports = router

router.post('/checkout', async (req, res) => {
  try {
    let {status} = await stripe.charges.create({
      amount: 2000,
      currency: 'usd',
      description: 'An example charge',
      source: req.body
    })
    //this needs to be written to accept req info
    res.json({status})
  } catch (err) {
    res.status(500).end()
  }
})
