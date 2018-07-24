const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

// products mounted inside index
// /products
router.get('/', async (req, res, next) => {
  try {
    let whereClause = {}
    if (req.query.categoryId) {
      whereClause = {
        categoryId: req.query.params.categoryId
      }
    }
    const products = await Product.findAll(whereClause)
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
  try {
    const product = await Product.create(req.body)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.put('/:productId', async (req, res, next) => {
  const {name, numInStock, price, description, imageUrls} = req.body
  const changedProduct = {name, numInStock, price, description, imageUrls}
  try {
    const productToChange = await Product.findById(req.params.productId)
    productToChange.update(changedProduct)
    res.json(productToChange)
  } catch (err) {
    next(err)
  }
})

router.delete('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId)
    product.destroy()
    res.json(product)
  } catch (err) {
    next(err)
  }
})
