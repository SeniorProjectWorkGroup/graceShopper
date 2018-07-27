import {expect} from 'chai'
import cartReducer, {
  getCart,
  addItem,
  deleteItem,
  clearCart,
  fetchCart,
  destroyItem,
  postItem
} from './cartReducer'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('reducer', () => {
  it('starts off with an empty state', () => {
    const state = cartReducer(undefined, '@@INIT')
    expect(state).to.deep.equal([])
  })
  it('on GET_CART it sets the cart', () => {
    const cart = [{productId: 1, quantity: 3}]
    const state = cartReducer([], getCart(cart))
    expect(state).to.deep.equal(cart)
  })
  it('Add Item adds a line item to the cart', () => {
    const newCart = {productId: 3, quantity: 4}
    const state = cartReducer([{productId: 1, quantity: 2}], addItem(newCart))
    expect(state).to.be.deep.equal([
      {productId: 1, quantity: 2},
      {productId: 3, quantity: 4}
    ])
  })
  it('delete cart will remove an item from the cart', () => {
    const targetItemId = 1
    const state = cartReducer(
      [{id: 0, productId: 1, quantity: 2}, {id: 1, productId: 3, quantity: 4}],
      deleteItem(targetItemId)
    )
    expect(state.length).to.equal(1)
  })
  it('Clear Cart will remove all items from cart', () => {
    const state = cartReducer(
      [{productId: 1, quantity: 2}, {productId: 3, quantity: 4}],
      clearCart()
    )
    expect(state).to.deep.equal([])
  })
})
describe.only('thunks', () => {
  let store
  let mockAxios
  const initState = []
  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initState)
  })
  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  it('FETCH CART will grab items from the DB', async () => {
    const fakeCart = [
      {id: 0, productId: 1, quantity: 2},
      {id: 1, productId: 3, quantity: 4}
    ]
    mockAxios.onGet('/api/cart/1').replyOnce(200, fakeCart)
    await store.dispatch(fetchCart(1))
    const actions = store.getActions()
    expect(actions[0].type).to.be.equal('GET_CART')
    expect(actions[0].cart).to.be.deep.equal([
      {id: 0, productId: 1, quantity: 2},
      {id: 1, productId: 3, quantity: 4}
    ])
  })
  // it('DELETE ITEM will delete items from the cart in the db', async () => {
  //   const fakeCart = [
  //     {id: 0, productId: 1, quantity: 2},
  //     {id: 1, productId: 3, quantity: 4}
  //   ]
  //   mockAxios.onAny('/api/items/1').replyOnce(200)
  //   await store.dispatch(destroyItem(1))
  //   const actions = store.getActions()
  //   expect(actions[0].cart.length).to.equal(1)
  // })
  // it('ADD ITEM will delete items from the cart in the db', async () => {
  //   const fakeCart = [
  //     {id: 0, productId: 1, quantity: 2},
  //     {id: 1, productId: 3, quantity: 4}
  //   ]
  //   mockAxios
  //     .onPost()('/api/items/1')
  //     .replyOnce(200)
  //   await store.dispatch(postItem({id: 1, productId: 3, quantity: 4}))
  //   const actions = store.getActions()
  //   expect(actions[0].cart.length).to.equal(3)
  // })
})
