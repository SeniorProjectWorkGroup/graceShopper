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
    console.log('reviews:', reviews)
    // Set layout
    return (
      <div>
        <div>
          <img src={'/' + product.imageUrl} />
        </div>
        <div><h1><b>{product.name}</b></h1></div>
        <div>Only {product.numInStock} left</div>
        <div><h3>${product.price}</h3></div>
        <div>{product.description}</div>
        <div>
          <button type="button">Add to Cart</button>
        </div>
        <br/>
        <div><h1>Reviews</h1></div>
        {reviews &&
          reviews.map(review => {
            return (
              <div key={review.id}>
                <div>user pic; {review.user.email}</div>
                <div><StarRating num={review.rating} />&nbsp;<b>{review.title}</b></div>
                <div>{review.createdAt}</div>
                <div><p>{review.text}</p></div>
                <br/>
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
