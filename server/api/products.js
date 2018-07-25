const router = require('express').Router()
const {Product, User, Category} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    // Eager load the categories for the products
    let whereClause = {include: [Category]}
    if (req.query.categoryId) {
      whereClause.categoryId = req.query.params.categoryId
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
  const {name, numInStock, price, description, imageUrls} = req.body

  //validate user as admin role
  try {
    const userId = req.session.passport.user
    const user = await User.findById(userId)
    if (!user || user.role !== 'ADMIN')
      throw new Error('User not authorized for post')

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
    const userId = req.session.passport.user
    const user = await User.findById(userId)
    if (!user || user.role !== 'ADMIN')
      throw new Error('User not authorized for post')

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
    const product = await Product.findById(req.params.productId)
    await product.destroy()
    res.json({product: product, message: 'Product Deleted'})
  } catch (err) {
    next(err)
  }
})
