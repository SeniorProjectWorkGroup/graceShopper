import React from 'react'
import {connect} from 'react-redux'
import {fetchCategories} from '../store/category'
import {setDisplayedProducts} from '../store/products/displayedProducts'

class CategorySideBar extends React.Component {
  componentDidMount() {
    this.props.fetchCategories()
  }

  createClickHandler = categoryId => event => {
    console.log('event.target:', event.target, 'categoryId:', categoryId)
    // Update displayedProducts to show products for the category
    const productsInCategory = this.props.productList.filter((product) => {
      return product.categories.find((category) => category.id === categoryId)
    })
    this.props.setDisplayedProducts(productsInCategory)
  }

  render() {
    const {categories} = this.props
    return (
      <div>
        <ul>
          {categories &&
            categories.map(category => {
              return (
                <li key={category.id}>
                  <button
                    onClick={this.createClickHandler(category.id)}
                    type="button"
                    className="category-btn"
                  >
                    {category.name}
                  </button>
                </li>
              )
            })}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({categories, productList}) => ({
  categories,
  productList
})

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories()),
  setDisplayedProducts: products => dispatch(setDisplayedProducts(products))
})

export default connect(mapStateToProps, mapDispatchToProps)(CategorySideBar)
