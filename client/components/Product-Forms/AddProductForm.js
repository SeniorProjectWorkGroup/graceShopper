import React, {Component} from 'react'
import {connect} from 'react-redux'
import {postProducts} from '../../store/products/productsList'
import {Oops} from '../Oops'

export class AddProductForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      numInStock: 1,
      price: 10,
      imgURL: '',
      category: 1,
      description: ''
    }
    this.submitBtn = null
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.validation = this.validation.bind(this)
  }

  validation() {
    return (
      this.state.description.length === 0 ||
      this.state.name.length === 0 ||
      parseInt(this.state.numInStock, 10) < 0 ||
      !this.state.numInStock ||
      typeof parseInt(this.state.numInStock, 10) !== 'number' ||
      parseInt(this.state.price, 10) < 0 ||
      !this.state.price ||
      typeof parseInt(this.state.price, 10) !== 'number'
    )
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }
  handleSubmit(evt) {
    evt.preventDefault()
    const newProductEntry = {
      name: this.state.name,
      numInStock: this.state.numInStock,
      price: this.state.price,
      imgURL: this.state.imgURL,
      category: this.state.category,
      description: this.state.description
    }
    this.props.submitProduct(newProductEntry)
    this.props.history.push('/')
  }

  render() {
    if (this.props.currentUser.role !== 'ADMIN') {
      return <Oops />
    }
    return (
      <div className="form-centered">
        <form
          className="text-center form-group text-white m-5"
          onSubmit={this.handleSubmit}
        >
          <label htmlFor="name"> Product Name </label>
          <input
            name="name"
            className={this.state.name.length > 0 ? '' : 'require'}
            value={this.state.name}
            onChange={this.handleChange}
          />
          <label htmlFor="numInStock"> Amount of Product in Stock </label>
          <input
            className={this.state.numInStock > 0 ? '' : 'require'}
            name="numInStock"
            min="0"
            placeholder="1"
            type="Number"
            value={this.state.numInStock}
            onChange={this.handleChange}
          />
          <label htmlFor="price"> Price </label>
          <input
            className={this.state.numInStock > 0 ? '' : 'require'}
            name="price"
            type="Number"
            min="0.00"
            placeholder="10.00"
            step="0.01"
            value={this.state.price}
            onChange={this.handleChange}
          />
          <label htmlFor="description"> Product Description </label>
          <textarea
            name="description"
            className={this.state.description.length > 0 ? '' : 'require'}
            value={this.state.description}
            onChange={this.handleChange}
            placeholder="Enter description here"
          />
          <label htmlFor="category"> Product Category </label>
          <select
            name="category"
            className="form-control"
            value={this.state.category}
            onChange={this.handleChange}
          >
            {this.props.categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <label htmlFor="imgURLs"> Image URLs </label>
          <input
            name="imgURL"
            value={this.state.imgURL}
            onChange={this.handleChange}
          />
          <button
            disabled={this.validation()}
            className={`flex m-auto mt-lg-1 rounded  quarterMasterBtn ${
              this.validation() ? 'btn-warning' : 'btn-primary'
            }`}
            type="submit"
          >
            {' '}
            Add Product{' '}
          </button>
        </form>
      </div>
    )
  }
}

const mapState = state => ({
  categories: state.categories,
  currentUser: state.user
})

const mapDispatchToProps = dispatch => ({
  submitProduct: product => dispatch(postProducts(product))
})

export default connect(mapState, mapDispatchToProps)(AddProductForm)
