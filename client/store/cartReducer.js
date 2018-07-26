//ACTION TYPES
const ActionTypes = {
  GET_CART: 'GET_CART',
  UPDATE_CART: 'UPDATE_CART',
  DELETE_CART: 'DELETE_CART',
  CREATE_CART: 'CREATE_CART'
}
//ACTION CREATORS
const getCart = cart => ({
  type: ActionTypes.GET_CART,
  cart
})
const updateCart = newCart => ({
  type: ActionTypes.UPDATE_CART,
  newCart
})
const deleteCart = () => ({
  type: ActionTypes.GET_CART
})
const createCart = cart => ({
  type: ActionTypes.CREATE_CART,
  cart
})
//THUNK CREATORS
// export fetchCart = () =>

//REDUCER
const defaultCart = {}

const cartReducer = (cartState = defaultCart, action) => {
  switch (action.type) {
    case ActionTypes.GET_CART:
      return action.cart
    case ActionTypes.UPDATE_CART:
      return action.newCart
    case ActionTypes.DELETE_CART:
      return defaultCart
    case ActionTypes.CREATE_CART:
      return action.cart
    default:
      return cartState
  }
}

export default cartReducer
