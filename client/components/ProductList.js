import React, {Component} from 'react'
import Product from './Product'
import {connect} from 'react-redux'
import {fetchProductsAndDisplay} from '../store/products/productsList'

function ProductList(props) {
  console.log(props.products)
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
    console.log('ProductLoader.componentDidMount()')
    // Fetch all the products from the server and set them to be the displayedProducts
    this.props.fetchProductsAndDisplay()
  }
  render() {
    return <ProductList {...this.props} />
  }
}

const mapStateToProps = ({ displayedProducts = [] }) => ({ products: displayedProducts })

const mapDispatchToProps = (dispatch) => ({
  fetchProductsAndDisplay: () => dispatch(fetchProductsAndDisplay())
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductLoader)
