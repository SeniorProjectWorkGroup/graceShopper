import React from 'react'
import {connect} from 'react-redux'
import {setDisplayedProducts} from '../store/products/displayedProducts'

class CategorySideBar extends React.Component {
  createClickHandler = categoryId => () => {
    categoryId = parseInt(categoryId, 10)
    // Update displayedProducts to show products for the category
    const productsInCategory = this.props.productList.filter(product => {
      return product.categories.find(category => category.id === categoryId)
    })
    this.props.setDisplayedProducts(productsInCategory)
    // this.props.history.push('/products')
  }

  getCategoriesAndCount = (products = []) => {
    // Format: {catId1: {categoryInfo, count}, catId2: {categoryInfo, count}..}
    // count refers to # of products
    const categoryHash = {}

    products.forEach(product => {
      // For each category of this product
      product.categories.forEach(category => {
        // Check if it's in the hash. If so, increment count, else add it to hash
        const categoryData = categoryHash[category.id]
        if (categoryData) {
          categoryData.count = categoryData.count + 1
        } else {
          categoryHash[category.id] = {categoryInfo: category, count: 1}
        }
      })
    })
    return categoryHash
  }

  capitalize = str => {
    return str[0].toUpperCase() + str.slice(1)
  }

  render() {
    // Derive the categories from the productList
    const categoriesAndCount = this.getCategoriesAndCount(
      this.props.productList
    )
    return (
      <div className="searchSideBar">
        <ul className="category-filter-list">
          {categoriesAndCount &&
            Object.entries(categoriesAndCount).map(
              ([categoryId, categoryData]) => {
                return (
                  <li className="categories" key={categoryId}>
                    <button
                      className="btn cart cartBtn"
                      onClick={this.createClickHandler(categoryId)}
                      type="button"
                    >
                      {categoryData.categoryInfo.imageUrl ? (
                        <img
                          src={categoryData.categoryInfo.imageUrl}
                          className="category-icon"
                        />
                      ) : (
                        <img
                          src="/icons/broad-dagger.svg"
                          className="category-icon"
                        />
                      )}
                      &nbsp;{this.capitalize(categoryData.categoryInfo.name)}{' '}
                      <span>{categoryData.count}</span>
                    </button>
                  </li>
                )
              }
            )}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({productList}) => ({productList})

const mapDispatchToProps = dispatch => ({
  setDisplayedProducts: products => dispatch(setDisplayedProducts(products))
})

export default connect(mapStateToProps, mapDispatchToProps)(CategorySideBar)
