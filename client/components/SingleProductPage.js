import React from 'react'
import {connect} from 'react-redux'
import {fetchProductById} from '../store/products/singleProduct'
import {fetchReviews} from '../store/reviews'
import StarRating from './StarRating'

class SingleProductPage extends React.Component {
  componentDidMount() {
    const productId = this.props.match.params.id
    const {product} = this.props
    // Get selectedProduct from server if not available
    if (!product || product.id !== productId) {
      this.props.fetchProduct(productId)
    }
    // Get product reviews from server
    this.props.fetchReviews(productId)
  }

  render() {
    // Product with eager loaded categories
    const {product, reviews} = this.props
    // Set layout
    return (
      <div>
        <div>
          <img src={'/' + product.imageUrl} />
        </div>
        <div>name: {product.name}</div>
        <div>numInStock: {product.numInStock}</div>
        <div>price: {product.price}</div>
        <div>description: {product.description}</div>
        <div>
          <button type="button">Add to Cart</button>
        </div>
        <div>Reviews</div>
        {reviews &&
          reviews.map(review => {
            return (
              <div key={review.id}>
                <div>{review.title}</div>
                <div>user name</div>
                <div>
                  <StarRating num={review.rating} />
                </div>
                <div>{review.text}</div>
              </div>
            )
          })}
      </div>
    )
  }
}

const mapStateToProps = ({currentProduct, reviewsForCurrProduct}) => ({
  product: currentProduct,
  reviews: reviewsForCurrProduct
})

const mapDispatchToProps = dispatch => ({
  fetchProduct: productId => dispatch(fetchProductById(productId)),
  fetchReviews: productId => dispatch(fetchReviews(productId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProductPage)
