const router = require('express').Router()
const {User} = require('../db/models')
const {isAdmin} = require('../api/helper')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (!isAdmin(req, next)) throw new Error('User not authorized for post')
    const users = await User.findAll({
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId', async (req, res, next) => {
  try {
    const {role} = req.body
    if (!isAdmin(req, next)) throw new Error('User not authorized for post')
    const selectedUser = await User.findById(req.params.userId)
    await selectedUser.update({role})
    res.json({message: 'User Role Updated', user: selectedUser})
  } catch (err) {
    next(err)
  }
})

router.delete('/:userId', async (req, res, next) => {
  try {
    if (!isAdmin(req, next)) throw new Error('User not authorized for post')
    const selectedUser = await User.findById(req.params.userId)
    await selectedUser.destroy()
    res.json({message: 'User Deleted'})
  } catch (err) {
    next(err)
  }
})
