import React, {Component} from 'react'
import Product from './Product'
import {connect} from 'react-redux'
import {fetchProductsWithPagination} from '../store/products/productsList'
import PaginationNav from './PaginationNav'

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
    this.setState({unlisten})

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

  parsePaginationQuery = location => {
    const query = new URLSearchParams(location.search)
    const limit = toIntIfExists(query.get('limit')) || DEFAULT_LIMIT
    const offset = toIntIfExists(query.get('offset')) || DEFAULT_OFFSET
    return [limit, offset]
  }

  doFetchProducts = location => {
    // Fetch with pagination
    console.log('In ProductList component. doFetchProducts. this.props.productList.length:', this.props.productList.length)
    const [limit, offset] = this.parsePaginationQuery(location)
    this.props.fetchProductsWithPagination(this.props.productList, limit, offset)
  }

  render() {
    // Use the current limit and offset to compute the pagination navigation limits & offsets
    const [limit, offset] = this.parsePaginationQuery(this.props.location)
    // const newOffset = offset + limit

    const totalNumProducts = this.props.productList.length
    const productsToShow = this.props.displayedProducts

    return (
      <div>
        <h1 style={{ display: 'inline' }}>All Products</h1>&nbsp;&nbsp;
        <h6 style={{ display: 'inline' }}>{offset}-{offset + limit} of {totalNumProducts} results</h6>
        <ProductList products={productsToShow} />
        {/* Pagination navigation */}
        <PaginationNav limit={limit} offset={offset} max={totalNumProducts} />
      </div>
    )
  }
}

const mapStateToProps = ({productList = [], displayedProducts = []}) => ({
  productList,
  displayedProducts
})

const mapDispatchToProps = dispatch => ({
  fetchProductsWithPagination: (allProducts, limit, offset) =>
    dispatch(fetchProductsWithPagination(allProducts, limit, offset))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductLoader)
