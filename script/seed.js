'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const products = require('./data/product.json')
const Product = require('../server/db/models/product')

/**
 * Welcome to the seed file!
 */

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  // Seed Users
  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])
  console.log(`seeded ${users.length} users`)

  // Seed Products
  const promiseArr = []
  products.forEach((product) => {
    const {name, numInStock, price, description} = product;
    promiseArr.push(Product.create({name, numInStock, price, description}))
  })
  await Promise.all(promiseArr)
  console.log(`seeded ${products.length} products`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
