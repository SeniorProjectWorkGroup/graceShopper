import axios from 'axios'

// ============  Action Types  ============
export const GOT_CATEGORIES_FROM_SERVER = 'GOT_CATEGORIES_FROM_SERVER'

// ============  Action Creators  ============
export const gotCategories = (categories) => ({
  type: GOT_CATEGORIES_FROM_SERVER,
  categories
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
function reduceCategories({ categories }, action) {
  switch(action.type) {
    case GOT_CATEGORIES_FROM_SERVER: return { categories: action.categories }
    default: return { categories }
  }
}
