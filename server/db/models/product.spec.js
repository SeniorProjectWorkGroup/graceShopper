/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  let newItem

  beforeEach(async () => {
    newItem = await Product.create({
      name: 'Shiny Thingamabob',
      numInStock: 3,
      price: 5.99,
      description:
        "This thing is so dang shiny. You need special sunglasses just to see it. Don't be the only person on your block without one!",
      imageUrl: 'https://www.google.com/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjN0ODGmbbcAhVOUt8KHRP_BQIQjRx6BAgBEAU&url=https%3A%2F%2Fmedium.com%2Fthe-bridge%2Fthat-shiny-thing-you-like-so-much-went-through-a-process-thats-why-it-works-7552638e7232&psig=AOvVaw2XE_Vz7Yjktl9spikuqH0h&ust=1532468852972335'
    })
  })

  describe('Product model', () => {
    it('has a name', () => {
      expect(newItem.name).to.be.equal('Shiny Thingamabob')
    })

    it('name cannot be null', () => {
      const item = Product.build()
      return item.validate().then(
        // if validation succeeds (bad), this function will fire
        () => {
          throw new Error('Validation should fail without a name')
        },
        // if validation fails (good), this function will fire
        result => {
          expect(result).to.be.an.instanceOf(Error)
        }
      )
    })

    it('has a number in stock', () => {
      console.log(typeof newItem.numInStock)
      expect(newItem.numInStock).to.be.equal(3)
    })

    it('has a price', () => {
      console.log(typeof newItem.price)
      expect(newItem.price).to.be.equal(5.99)
    })

    it('price cannot be less than 0', () => {
      const item = Product.build({name: 'Lexie', price: -1})
      return item.validate().then(
        // if validation succeeds (bad), this function will fire
        () => {
          throw new Error('Validation should fail when age is less than 0')
        },
        // if validation fails (good), this function will fire
        result => {
          expect(result).to.be.an.instanceOf(Error)
        }
      )
    })

    it('has a description', () => {
      const item = Product.build({name: 'Stuff', description: "it's very nice"})
      expect(item.description).to.be.equal("it's very nice")
    })

    it('description cannot be null', () => {
      const item = Product.build({name: 'thing'})
      return item.validate().then(
        // if validation succeeds (bad), this function will fire
        () => {
          throw new Error('Validation should fail without a name')
        },
        // if validation fails (good), this function will fire
        result => {
          expect(result).to.be.an.instanceOf(Error)
        }
      )
    })
  })
})
