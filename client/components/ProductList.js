import React, {Component} from 'react'
import Product from './Product'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {
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

const DEFAULT_LIMIT = 20
const DEFAULT_OFFSET = 0

class ProductLoader extends Component {
  state = {
    unlisten: null
  }

  componentDidMount() {
    // Fetch and set the displayedProducts based on any changes to the URL
    // Handles user clicking on a browser navigation button (Forward or Back)
    // as well as any intra-app navigation (like clicking the Next pagination button)
    const unlisten = this.props.history.listen((location, action) => {
      console.log(
        `The current URL is ${location.pathname}${location.search}${
          location.hash
        }`
      )
      console.log(`The last navigation action was ${action}`)
      this.doFetchProducts(location)
    })
    this.setState({ unlisten })

    // Fetch with pagination
    this.doFetchProducts(this.props.location)
  }

  componentWillUnmount() {
    // Unregister the browser listener if this component unmounts so we don't
    // double up on listeners if component remounts
    const unlisten = this.state.unlisten
    if (unlisten) {
      unlisten()
    }
  }

  parsePaginationQuery = (location) => {
    const query = new URLSearchParams(location.search)
    const limit = toIntIfExists(query.get('limit')) || DEFAULT_LIMIT
    const offset = toIntIfExists(query.get('offset')) || DEFAULT_OFFSET
    return [limit, offset]
  }

  doFetchProducts = location => {
    // Fetch with pagination
    const [limit, offset] = this.parsePaginationQuery(location)
    this.props.fetchProductsWithPagination(limit, offset)
  }

  render() {
    // Use the current limit and offset to compute the pagination navigation limits & offsets
    const [limit, offset] = this.parsePaginationQuery(this.props.location)
    const newOffset = offset + limit

    const productsToShow = this.props.displayedProducts

    return (
      <div>
        <h1>All Products</h1>
        <ProductList products={productsToShow} />
        {/* Pagination navigation */}
        <NavLink to={`/products?limit=${limit}&offset=${newOffset}`}>
          Next ->
        </NavLink>
      </div>
    )
  }
}

const mapStateToProps = ({displayedProducts = []}) => ({
  displayedProducts: displayedProducts
})

const mapDispatchToProps = dispatch => ({
  fetchProductsWithPagination: (limit, offset) =>
    dispatch(fetchProductsWithPagination(limit, offset))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductLoader)
