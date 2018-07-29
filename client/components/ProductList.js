import React, {Component} from 'react'
import Product from './Product'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {
  fetchProductsAndDisplay,
  fetchProductsWithPagination
} from '../store/products/productsList'

function ProductList({products}) {
  return (
    <div className="list-container">
      <ul className="product-grid">
        {products.map(product => (
          <Product product={product} key={product.id} />
        ))}
      </ul>
    </div>
  )
}

const toIntIfExists = str => {
  if (str && str !== null) {
    return parseInt(str, 10)
  }
  return undefined
}

const DEFAULT_LIMIT = 3
const DEFAULT_OFFSET = 0

class ProductLoader extends Component {
  componentDidMount() {
    // Fetch with pagination
    const query = new URLSearchParams(this.props.location.search)
    const limit = toIntIfExists(query.get('limit')) || DEFAULT_LIMIT
    const offset = toIntIfExists(query.get('offset')) || DEFAULT_OFFSET
    this.props.fetchProductsWithPagination(limit, offset)

    // Fetch all the products from the server and set them to be the displayedProducts
    // this.props.fetchProductsAndDisplay()
  }

  handleNext = (limit, offset) => {
    return () => {
      this.props.fetchProductsWithPagination(limit, offset)
    }
  }

  // React component loading 2 cases:
  //  1. Hard load. First mounting (navigating directly to URL in URL bar or first time to URL)
  //  2. Soft load. Update without remounting (like change url search params, Back button)

  // Either set display and this component only shows displayedComponents (what does the updates?)
  // - The next button click needs to fetch and display next products b/c component won't mount again
  // - *Back button is broken
  // - easier to implement? Navigating directly to the URL will be a hard refresh so that'll work

  // Or component receives limit & offset window and displays what's in allProducts based on that
  // - Inflexible

  // **NOTE: Current impl ignores displayedProducts. It displays a window on productList
  render() {
    // Use the current limit and offset to compute the pagination navigation limits & offsets
    const query = new URLSearchParams(this.props.location.search)
    let limit = toIntIfExists(query.get('limit')) || DEFAULT_LIMIT
    const currOffset = toIntIfExists(query.get('offset')) || DEFAULT_OFFSET
    const newOffset = currOffset + limit
    // console.log('limit:', limit, 'currOffset:', currOffset, 'newOffset:', newOffset)
    // Set the window on allProducts
    const productsToShow = this.props.allProducts.slice(
      currOffset,
      currOffset + limit
    )

    // console.log('allProducts:', this.props.allProducts)
    // console.log('productsToShow:', productsToShow)
    return (
      <div>
        <ProductList products={productsToShow} />
        {/* Pagination navigation */}
        <NavLink
          to={`/products?limit=${limit}&offset=${newOffset}`}
          onClick={this.handleNext(limit, newOffset)}
        >
          Next ->
        </NavLink>
      </div>
    )
  }
}

const mapStateToProps = ({productList = [], displayedProducts = []}) => ({
  allProducts: productList,
  displayedProducts: displayedProducts
})

const mapDispatchToProps = dispatch => ({
  fetchProductsAndDisplay: () => dispatch(fetchProductsAndDisplay()),
  fetchProductsWithPagination: (limit, offset) =>
    dispatch(fetchProductsWithPagination(limit, offset))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductLoader)
