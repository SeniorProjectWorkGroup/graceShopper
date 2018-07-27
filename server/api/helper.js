// const {User} = require('../db/models')
// const router = require('express').Router()

module.exports.isAdmin = function(req, next) {
  // const user = await User.findById(req.user)
  // return user && user.role === 'ADMIN'
  return true;
}
module.exports.isUser = function(req, next) {
  // const user = await User.findById(req.user)
  // return !!user
  return true;
}
