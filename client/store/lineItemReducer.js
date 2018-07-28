//ACTION TYPES
const ActionTypes = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM'
  // DELETE_CART: 'DELETE_CART',
  // CREATE_CART: 'CREATE_CART'
}
//ACTION CREATORS
export const addToCart = item => {
  return {
    type: ActionTypes.ADD_ITEM,
    item
  }
}
export const removeFromCart = item => {
  return {
    type: 'REMOVE_ITEM',
    item
  }
}

// need second look here

function lineItemReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return state.concat(action.item)
    case 'REMOVE_ITEM': {
      const indx = state.indexOf(action.item)
      return state.filter((_, idx) => indx !== idx)
    }
    default:
      return state
  }
}

export default lineItemReducer
