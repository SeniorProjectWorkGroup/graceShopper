import axios from 'axios'

//ACTION TYPES
const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_PRODUCTS_BY_CATEGORY
const ADD_PRODUCT = 'POST_PRODUCTS'

//ACTION CREATORS
const getProducts = products => ({
  type: GET_PRODUCTS,
  products
})

const addProduct = product => ({
  type: POST_PRODUCT,
  product
})

const getProductsByCategory = (products) => {
  type: GET_PRODUCTS_BY_CATEGORY,
  products
}

//THUNK CREATORS
export const fetchProducts = () => {
  return async dispatch => {
    const {data} = await axios.get('/api/products')
    dispatch(getProducts(data))
  }
}


// CHECK FOR CORRECT APPROACH
export const fetchProductsByCategory = (categoryId) => {
  return async dispatch => {
    const {data} = await axios.get(`/api/products?categoryId=${categoryId}`)
    dispatch(getProducts(data))
  }
}

export const postProducts = product => {
  return async dispatch => {
    const {data} = await axios.post('/api/products', product)
    dispatch(getProducts(data))
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
    default:
      return productListState
  }
}

export default productListReducer
