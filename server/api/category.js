const router = require('express').Router()
const {Category} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll({})
    res.json(categories)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  const {name} = req.body
  try {
    const newCategory = await Category.create({name})
    res.status(200)
    res.json({
      message: 'Category Created',
      category: newCategory
    })
  } catch (err) {
    next(err)
  }
})

router.put('/:categoryId', async (req, res, next) => {
  const {name} = req.body
  try {
    const selectedCategory = await Category.findById(req.params.categoryId)
    await selectedCategory.update({name})
    res.json({
      message: 'Category Updated',
      name
    })
  } catch (err) {
    next(err)
  }
})

router.delete('/:categoryId', async (req, res, next) => {
  try {
    const selectedCategory = await Category.findById(req.params.categoryId)
    await selectedCategory.destroy()
    res.status()
    res.json({
      message: 'Category Deleted'
    })
  } catch (err) {
    next(err)
  }
})
