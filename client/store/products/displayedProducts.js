// ============  Action Types  ============
export const SET_DISPLAYEDPRODUCTS = 'SET_DISPLAYEDPRODUCTS'

// ============  Action Creators  ============
export const setDisplayedProducts = products => ({
  type: SET_DISPLAYEDPRODUCTS,
  products
})

// ============  Reducers  ============
export const displayedProducts = (state = [], action) => {
  switch (action.type) {
    case SET_DISPLAYEDPRODUCTS:
      return action.products
    default:
      return state
  }
}
