const router = require('express').Router()
const {Product, Category} = require('../db/models')
const {isAdmin} = require('./helper')

module.exports = router
router.get('/', async (req, res, next) => {
  try {
    // Eager load the categories for the products
    let whereClause = {include: [Category]}
    if (req.query.categoryId) {
      whereClause.where = {categoryId: req.query.params.categoryId}
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
  const {name, numInStock, price, description, imageUrls, categoryId} = req.body
  try {
    if (!isAdmin(req, next)) throw new Error('User not authorized for post')
    const product = await Product.create({
      name,
      numInStock,
      price,
      description,
      imageUrls
    })
    const categoryForProduct = await Category.findById(categoryId)
    product.addCategory(categoryForProduct)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.put('/:productId', async (req, res, next) => {
  const {name, numInStock, price, description, imageUrls, categoryId} = req.body
  const changedProduct = {
    name,
    numInStock,
    price,
    description,
    imageUrls
  }
  try {
    if (!isAdmin(req, next)) throw new Error('User not authorized for put')
    const productToChange = await Product.findById(req.params.productId)
    await productToChange.update(changedProduct)
    const categoryForProduct = await Category.findById(categoryId)
    productToChange.addCategory(categoryForProduct)

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
