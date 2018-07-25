import axios from 'axios'

// ============  Action Types  ============
export const GOT_CATEGORIES_FROM_SERVER = 'GOT_CATEGORIES_FROM_SERVER'
export const FILTER_PRODUCTS_BY_CATEGORY = 'FILTER_PRODUCTS_BY_CATEGORY'

// ============  Action Creators  ============
export const gotCategories = (categories) => ({
  type: GOT_CATEGORIES_FROM_SERVER,
  categories
})

export const filterProductsByCategory = (category, products) => ({
  type: FILTER_PRODUCTS_BY_CATEGORY,
  category,
  products
})

// ============  Thunk Creators  ============
export const fetchCategories = () => {
  return async dispatch => {
    try {
      const { data: categories } = await axios.get('/api/categories')
      dispatch(gotCategories(categories))
    } catch (err) {
      console.error(err)
    }
  }
}

// ============  Reducers  ============
export const categories = (state = [], action) => {
  // console.log('in reduceCategories. action:', action)
  switch(action.type) {
    case GOT_CATEGORIES_FROM_SERVER: return action.categories
    default: return state
  }
}
