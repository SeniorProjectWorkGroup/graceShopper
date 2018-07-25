import React, {Component} from 'react'
import Product from './Product'
import {connect} from 'react-redux'
import {fetchProductsAndDisplay} from '../store/products/productsList'

function ProductList(props) {
  return (
    <div>
      <ul>
        {props.products.map(product => (
          <Product product={product} key={product.id} />
        ))}
      </ul>
    </div>
  )
}

class ProductLoader extends Component {
  componentDidMount() {
    // Fetch all the products from the server and set them to be the displayedProducts
    this.props.fetchProductsAndDisplay()
  }
  render() {
    return <ProductList {...this.props} />
  }
}

const mapStateToProps = ({displayedProducts = []}) => ({
  products: displayedProducts
})

const mapDispatchToProps = dispatch => ({
  fetchProductsAndDisplay: () => dispatch(fetchProductsAndDisplay())
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductLoader)
