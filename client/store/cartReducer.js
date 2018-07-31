import axios from 'axios'
import {combineReducers} from 'redux'
import lineItemReducer from './lineItemReducer'
import {ActionTypes} from './lineItemReducer'

//REDUCER
// const cartReducer = combineReducers({lineItems: lineItemReducer})

// const cartReducer = (cart = { lineItems: []}, action) => {
//   switch (action.type) {
//     case ActionTypes.GOT_ITEMS: {
//       console.log('Reducer', action.lineItems)
//       return { ...cart, lineItems: action.lineItems }
//     }
//     default: return cart
//   }
// }

const cartReducer = (cart = {lineItems: []}, action) => {
  const newLineItems = lineItemReducer(cart.lineItems, action)
  if (cart.lineItems !== newLineItems) {
    return {lineItems: newLineItems}
  }
  return cart
}

export default cartReducer
