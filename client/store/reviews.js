import axios from 'axios'

// ============  Action Types  ============
export const GOT_REVIEWS_FROM_SERVER = 'GOT_REVIEWS_FROM_SERVER'

// ============  Action Creators  ============
export const gotReviews = (reviews) => ({
  type: GOT_REVIEWS_FROM_SERVER,
  reviews
})

// ============  Thunk Creators  ============
export const fetchReviews = (productId) => {
  return async dispatch => {
    try {
      const { data: reviews } = await axios.get('/api/reviews/product/' + productId)
      dispatch(gotReviews(reviews))
    } catch (err) {
      console.error(err)
    }
  }
}

// ============  Reducers  ============
export const reviewsForCurrProduct = (state = [], action) => {
  switch(action.type) {
    case GOT_REVIEWS_FROM_SERVER: return action.reviews
    default: return state
  }
}
