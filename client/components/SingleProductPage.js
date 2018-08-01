import React from 'react'
import {connect} from 'react-redux'
import {fetchProductById} from '../store/products/singleProduct'
import {fetchReviews} from '../store/reviews'
import ReviewSection from './ReviewSection'
import {addItemToCartInServer} from '../store/lineItemReducer'

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
    const productId = this.props.match.params.id
    // Set layout
    return (
      <div className="single-prod-card">
        <div className="img-container">
          <img className="prod-pic" src={'/' + product.imageUrl} />
        </div>
        <div className="prod-text">
          <div>
            <h1>
              <b className="text-white">{product.name}</b>
            </h1>
          </div>
          <div className="prod-info">
            {product.numInStock >= 1 ? (
              <div>Only {product.numInStock} left</div>
            ) : (
              <div> No More in Ye' old armoury </div>
            )}

            <div className="prod-des">{product.description}</div>
            <div>
              <h3>${product.price}</h3>
            </div>
            <div>
              {/* <button type="button">Add to Cart</button> */}
              <button
                type="button"
                onClick={() =>
                  this.props.addToCart(product.id, this.props.user.cartId)
                }
              >
                Add to Cart
              </button>
            </div>
          </div>
          <br />
          <ReviewSection reviews={reviews} productId={productId} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({currentProduct, reviewsForCurrProduct, user}) => ({
  product: currentProduct,
  reviews: reviewsForCurrProduct,
  user
})

const mapDispatchToProps = dispatch => ({
  fetchProduct: productId => dispatch(fetchProductById(productId)),
  fetchReviews: productId => dispatch(fetchReviews(productId)),
  addToCart: (productId, cartId) =>
    dispatch(addItemToCartInServer({productId, cartId}))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProductPage)
