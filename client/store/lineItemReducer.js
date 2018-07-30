import axios from 'axios'
//ACTION TYPES
const ActionTypes = {
  GOT_ITEMS: 'GOT_ITEMS',
  ADD_ITEM: 'ADD_ITEM',
  DELETE_ITEM: 'DELETE_ITEM',
  EDIT_ITEM: 'EDIT_ITEM',
  CLEAR_CART: 'CLEAR_CART',
  CREATE_CART: 'CREATE_CART'
}
//ACTION CREATORS
export const gotLineItems = lineItems => ({
  type: ActionTypes.GOT_ITEMS,
  lineItems
})
export const addedLineItem = newItem => ({
  type: ActionTypes.ADD_ITEM,
  newItem
})

export const editedLineItem = editedItem => ({
  type: ActionTypes.EDIT_ITEM,
  editedItem
})

export const deletedLineItem = deletedId => ({
  type: ActionTypes.DELETE_ITEM,
  deletedId
})
export const clearCart = () => ({
  type: ActionTypes.CLEAR_CART
})
//THUNK CREATORS
export const fetchLineItems = () => {
  return async dispatch => {
    try {
      const {data: lineItems} = await axios.get(`/api/items`)
      console.log('Thunk', lineItems)
      dispatch(gotLineItems(lineItems))
    } catch (err) {
      console.log(err)
    }
  }
}

export const putLineItem = (itemId, editedItem) => {
  return async dispatch => {
    const {data: updatedItem} = await axios.put(
      `/api/items/${itemId}`,
      editedItem
    )
    dispatch(editedItem(updatedItem))
  }
}

export const destroyItem = itemId => {
  return async dispatch => {
    await axios.delete(`/api/items/${itemId}`)
    dispatch(deletedLineItem(itemId))
  }
}
export const addItemToCartInServer = item => {
  return async dispatch => {
    const {data} = await axios.post(`/api/items/`, item)
    dispatch(addedLineItem(data))
  }
}

//REDUCER
const defaultLineItems = []

const lineItemReducer = (lineItemsState = defaultLineItems, action) => {
  switch (action.type) {
    case ActionTypes.GOT_ITEMS: {
      console.log('Reducer', action.lineItems)
      return action.lineItems
    }
    case ActionTypes.ADD_ITEM:
      return [...lineItemsState, action.newItem]
    case ActionTypes.EDIT_ITEM: {
      const listOfItems = lineItemsState.map(item => {
        if (item.id === action.editedItem.id) {
          return action.editedItem
        } else return item
      })
      return listOfItems
    }
    case ActionTypes.DELETE_ITEM: {
      const filteredListOfItems = lineItemsState.filter(item => {
        return item.id !== action.deletedId
      })
      return filteredListOfItems
    }
    case ActionTypes.CLEAR_ITEMS:
      return defaultLineItems
    default:
      return defaultLineItems
  }
}

export default lineItemReducer
