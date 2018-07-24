import React from 'react'
import {connect} from 'react-redux'
import {fetchCategories} from '../store/category'

class CategorySideBar extends React.Component {
  componentDidMount() {
    this.props.fetchCategories()
  }

  createClickHandler = (categoryId) => (event) => {
    console.log('event.target:', event.target, 'categoryId:', categoryId)
    // TODO: Update displayedProducts to show products for the category
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
                  <button onClick={this.createClickHandler(category.id)} type="button" className="category-btn">{category.name}</button>
                </li>
              )
            })}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({categories}) => ({categories})

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories())
})

export default connect(mapStateToProps, mapDispatchToProps)(CategorySideBar)
