import React, {Component} from 'react'
import Product from './Product'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products/productsList'

function ProductList(props) {
  return (
    <ul>
      {props.products.map(product => (
        <Product product={product} key={product.id} />
      ))}
    </ul>
  )
}

class ProductLoader extends Component {
  componentDidMount() {
    this.props.getAllProducts()
  }
  render() {
    return <ProductList {...this.props} />
  }
}

const mapStateToProps = function(state) {
  return {products: state.productList}
}

const mapDispatchToProps = function(dispatch) {
  return {getAllProducts: () => dispatch(fetchProducts())}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductLoader)
