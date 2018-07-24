import axios from 'axios'

//ACTION TYPES
const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_PRODUCTS_BY_CATEGORY = 'GET_PRODUCTS_BY_CATEGORY'
const ADD_PRODUCT = 'POST_PRODUCTS'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const EDIT_PRODUCT = 'EDIT_PRODUCT'

//ACTION CREATORS
const getProducts = products => ({
  type: GET_PRODUCTS,
  products
})

const addProduct = product => ({
  type: ADD_PRODUCT,
  product
})

const getProductsByCategory = products => ({
  type: GET_PRODUCTS_BY_CATEGORY,
  products
})

const deleteProduct = deletedId => ({
  type: DELETE_PRODUCT,
  deletedId
})

const editProduct = editedId => ({
  type: EDIT_PRODUCT,
  editedId
})

//THUNK CREATORS
export const fetchProducts = () => {
  return async dispatch => {
    const {data} = await axios.get('/api/products')
    dispatch(getProducts(data))
  }
}

// CHECK FOR CORRECT APPROACH
export const fetchProductsByCategory = categoryId => {
  return async dispatch => {
    const {data} = await axios.get(`/api/products?categoryId=${categoryId}`)
    dispatch(getProductsByCategory(data))
  }
}
export const postProducts = product => {
  return async dispatch => {
    const {data} = await axios.post('/api/products', product)
    dispatch(addProduct(data))
  }
}

export const putProductById = productId => {
  return async dispatch => {
    const {data} = await axios.put(`/api/products/${productId}`)
    dispatch(editProduct(data))
  }
}

export const destroy = productId => {
  return async dispatch => {
    await axios.delete(`/api/products/${productId}`)
    dispatch(deleteProduct(productId))
  }
}

const productListReducer = (productListState = [], action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    case GET_PRODUCTS_BY_CATEGORY:
      return action.products
    case ADD_PRODUCT:
      return [...productListState, action.product]
    case DELETE_PRODUCT: {
      const filteredList = productListState.filter(product => {
        return product.id !== action.deletedId
      })
      return filteredList
    }
    case EDIT_PRODUCT: {
      const filteredList = this.productListState(product => {
        return product.id !== action.editedId
      })
      return filteredList
    }
    default:
      return productListState
  }
}

export default productListReducer
