import axios from 'axios'

//ACTION TYPES
const GET_PRODUCT_BY_ID = 'GET_PRODUCT_BY_ID'

//ACTION CREATORS
const getProductById = product => ({
  type: GET_PRODUCT_BY_ID,
  product
})

//THUNK CREATORS
export const fetchProductById = productId => {
  return async dispatch => {
    const {data} = await axios.get(`/api/products/${productId}`)
    dispatch(getProductById(data))
  }
}

const singleProductReducer = (singleProductState = {}, action) => {
  switch (action.type) {
    case GET_PRODUCT_BY_ID:
      return action.product
    default:
      return singleProductState
  }
}

export default singleProductReducer
