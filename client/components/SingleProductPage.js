import React from 'react'
import {connect} from 'react-redux'
import {fetchProductById} from '../store/products/singleProduct'

class SingleProductPage extends React.Component {
  componentDidMount() {
    const productId = this.props.match.params.id;
    const {product} = this.props;
    // Get selectedProduct from server if not available
    if (!product || product.id !== productId) {
      this.props.fetchProduct(productId);
    }
  }

  render() {
    // Product with eager loaded categories
    const {product} = this.props
    // Set layout
    return (
      <div>
        <div><img src={'/' + product.imageUrl}/></div>
        <div>name: {product.name}</div>
        <div>numInStock: {product.numInStock}</div>
        <div>price: {product.price}</div>
        <div>description: {product.description}</div>
        <div><button type="button">add to cart button</button></div>

      </div>
    )
  }
}

const mapStateToProps = ({ currentProduct }) => ({ product: currentProduct })

const mapDispatchToProps = (dispatch) => ({
  fetchProduct: (productId) => dispatch(fetchProductById(productId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProductPage)
