/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  let newOrder

  beforeEach(async () => {
    const today = new Date()
    newOrder = await Order.create({
      addressAtPurchase: '123 somewhere way IL, 60121',
      status: 'CREATED',
      totalSale: 18.99,
      totalItems: 6,
      dateOfPurchase: today
    })
  })

  describe('Order model', () => {
    it('has an address', () => {
      expect(newOrder.addressAtPurchase).to.be.equal(
        '123 somewhere way IL, 60121'
      )
    })

    it('address cannot be null', () => {
      const order = Order.build()
      return order.validate().then(
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

    // it('has total item count', () => {
    //   expect(newOrder.totalItems).to.be.equal(6)
    // })

    // it('has a total Sale', () => {
    //   expect(newOrder.totalSale).to.be.equal(18.99)
    // })

    // it('item count cannot be less than 1', () => {
    //   const order = Order.build({
    //     addressAtPurchase: '1234 fake st',
    //     totalItems: 0
    //   })
    //   return order.validate().then(
    //     // if validation succeeds (bad), this function will fire
    //     () => {
    //       throw new Error('Validation should fail when age is less than 0')
    //     },
    //     // if validation fails (good), this function will fire
    //     result => {
    //       expect(result).to.be.an.instanceOf(Error)
    //     }
    //   )
    // })

    it('has a date of purchase', () => {
      const today = new Date()
      const order = Order.build({
        addressAtPurchase: '1234 fake st',
        dateOfPurchase: today
      })
      expect(order.dateOfPurchase).to.be.equal(today)
    })
  })
})
