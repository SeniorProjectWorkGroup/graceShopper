// const {User} = require('../db/models')
// const router = require('express').Router()


const isAdmin = function(req, next) {
  console.log('inside isAdmin', req.user)
  return req.user && req.user.role === 'ADMIN'
}
const isUser = async function(req, next) {
  console.log('inside isUser', req.user)
  return !!req.user

}

module.exports = {isAdmin, isUser}
