const {expect} = require('chai')
const db = require('../index')
const Category = db.model('category')

describe('Category Model', () => {
  before(() => {
    return db.sync({force: true})
  })

  it('requires name not to be null', async () => {
    try {
      await Category.create()
      throw new Error('Category Created with no name')
    } catch (err) {
      expect(err.message).to.equal(
        'notNull Violation: category.name cannot be null'
      )
    }
  })
  it('requires name not be empty', async () => {
    try {
      await Category.create({name: ''})
      throw new Error('Category Created with no name')
    } catch (err) {
      expect(err.message).to.equal(
        'Validation error: Validation notEmpty on name failed'
      )
    }
  })
})
