import axios from 'axios'
//ACTION TYPES
const ActionTypes = {
  GET_CART: 'GET_CART',
  ADD_ITEM: 'ADD_ITEM',
  DELETE_ITEM: 'DELETE_ITEM',
  CLEAR_CART: 'CLEAR_CART',
  CREATE_CART: 'CREATE_CART'
}
//ACTION CREATORS
export const getCart = cart => ({
  type: ActionTypes.GET_CART,
  cart
})
export const addItem = newItem => ({
  type: ActionTypes.ADD_ITEM,
  newItem
})
export const deleteItem = deletedId => ({
  type: ActionTypes.DELETE_ITEM,
  deletedId
})
export const clearCart = () => ({
  type: ActionTypes.CLEAR_CART
})
//THUNK CREATORS
export const fetchCart = cartId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/cart/${cartId}`)
      console.log(data)
      dispatch(getCart(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const destroyItem = itemId => {
  return async dispatch => {
    await axios.delete(`/api/items/${itemId}`)
    dispatch(deleteItem(itemId))
  }
}
export const postItem = item => {
  return async dispatch => {
    const {data} = await axios.post(`/api/items/`, item)
    dispatch(addItem(data))
  }
}

//REDUCER
const defaultCart = []

const cartReducer = (cartState = defaultCart, action) => {
  switch (action.type) {
    case ActionTypes.GET_CART:
      return action.cart
    case ActionTypes.ADD_ITEM:
      return [...cartState, action.newItem]
    case ActionTypes.DELETE_ITEM: {
      const filtered = cartState.filter(item => {
        return item.id !== action.deletedId
      })
      console.log('Filtered', filtered)
      return filtered
    }
    case ActionTypes.CLEAR_CART:
      console.log('Clearing')
      return defaultCart
    default:
      // console.log("default", cartState)
      return cartState
  }
}

export default cartReducer
