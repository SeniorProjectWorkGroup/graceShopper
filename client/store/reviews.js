import axios from 'axios'

// ============  Action Types  ============
export const GOT_REVIEWS_FROM_SERVER = 'GOT_REVIEWS_FROM_SERVER'
export const GOT_REVIEWS_AND_MERGE = 'GOT_REVIEWS_AND_MERGE'

// ============  Action Creators  ============
export const gotReviews = (reviews) => ({
  type: GOT_REVIEWS_FROM_SERVER,
  reviews
})

export const gotReviewsAndMerge = (reviews) => ({
  type: GOT_REVIEWS_AND_MERGE,
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

export const postReview = (productId, review) => {
  return async dispatch => {
    try {
      const { data: createdReview } = await axios.post(`/api/reviews/product/${productId}`, review)
      // Need to update the reviews we already have
      dispatch(gotReviewsAndMerge([createdReview]))
    } catch (err) {
      console.error(err)
    }
  }
}

// ============  Reducers  ============
export const reviewsForCurrProduct = (state = [], action) => {
  switch(action.type) {
    case GOT_REVIEWS_FROM_SERVER: return action.reviews
    case GOT_REVIEWS_AND_MERGE: return [...action.reviews, ...state]
    default: return state
  }
}
