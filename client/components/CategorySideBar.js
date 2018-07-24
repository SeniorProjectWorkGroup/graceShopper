import React from 'react'
import {connect} from 'react-redux'
import {fetchCategories} from '../store/category'

class CategorySideBar extends React.Component {

  componentDidMount() {
    this.props.fetchCategories()
  }

  render() {
    const categories = this.props.categories
    return (
      <div>
        <ul>
        {categories && categories.map(category => {
          return <li key={category.id}>{category.name}</li>
        })}
        </ul>
      </div>
    )
  }
}

const mapStateToProps= ({ categories }) => ({ categories })

const mapDispatchToProps = (dispatch) => ({ fetchCategories: () => dispatch(fetchCategories()) })

export default connect(mapStateToProps, mapDispatchToProps)(CategorySideBar)
