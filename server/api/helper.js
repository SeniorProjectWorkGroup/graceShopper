const {User} = require('../db/models')
// const router = require('express').Router()

export const isAdmin = async function(req, next) {
  const user = await User.findById(req.user)
  return user || user.role === 'ADMIN'
}
export const isUser = async function(req, next) {
  const user = await User.findById(req.user)
  return user
}
