const router = require('express').Router()
const {User} = require('../db/models')
const {isAdmin} = require('../api/helper')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (!isAdmin(req, next)) throw new Error('User not authorized to get users')
    const users = await User.findAll({
      attributes: ['id', 'email', 'role']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId', async (req, res, next) => {
  try {
    const {role} = req.body
    console.log('Role', role)
    if (!isAdmin(req, next)) throw new Error('User not authorized for post')
    const selectedUser = await User.findById(req.params.userId)
    const {dataValues} = await selectedUser.update({role})
    console.log('updatedUser', dataValues)
    res.json({message: 'User Role Updated', user: dataValues})
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
