const router = require('express').Router()
const {Product, Category} = require('../db/models')
const {isAdmin} = require('./helper')

module.exports = router

function buildWhereClause(...dataArr) {
  const where = {}
  dataArr.forEach(data => {
    const {obj, keys} = data
    keys.forEach(key => {
      // If the key exists in the object, add it to the where clause
      if (obj[key]) {
        where[key] = obj[key]
      }
    })
  })
  return where
}

router.get('/', async (req, res, next) => {
  try {
    // Eager load the categories for the products
    let options = {include: [Category]}

    // Pulls the keys from req.query and uses them to construct a where clause
    options.where = buildWhereClause({
      obj: req.query,
      keys: ['categoryId']
    })
    if (req.query.limit) options.limit = req.query.limit
    if (req.query.offset) options.offset = req.query.offset
    options.where.numInStock = {$gte: 1}
    const products = await Product.findAll(options)
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  const {name, numInStock, price, description, imageUrls} = req.body
  try {
    if (!isAdmin(req, next)) throw new Error('User not authorized for post')
    const product = await Product.create({
      name,
      numInStock,
      price,
      description,
      imageUrls
    })
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.put('/:productId', async (req, res, next) => {
  const {name, numInStock, price, description, imageUrls} = req.body
  const changedProduct = {name, numInStock, price, description, imageUrls}
  try {
    if (!isAdmin(req, next)) throw new Error('User not authorized for put')
    const productToChange = await Product.findById(req.params.productId)
    await productToChange.update(changedProduct)
    res.json({
      productToChange: productToChange,
      message: 'Product Updated'
    })
  } catch (err) {
    next(err)
  }
})

router.delete('/:productId', async (req, res, next) => {
  try {
    if (!isAdmin(req, next)) throw new Error('User not authorized for post')
    const product = await Product.findById(req.params.productId)
    await product.destroy()
    res.json({product: product, message: 'Product Deleted'})
  } catch (err) {
    next(err)
  }
})
