import React from 'react'
import CategorySideBar from './CategorySideBar'
import ProductList from './ProductList'

const ProductsPage = props => {
  return (
    <div className="products-page-container">
      <CategorySideBar />
      <ProductList {...props} />
    </div>
  )
}

export default ProductsPage
