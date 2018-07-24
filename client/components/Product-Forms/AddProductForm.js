import React, {Component} from 'react'
import {connect} from 'react-redux'
import {postProducts} from '../../store/products/productsList'

class AddProductForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      numInStock: 1,
      price: 10,
      imgURL: '',
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
      this.state.numInStock < 0 ||
      this.state.price < 0
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
      description: this.state.description
    }
    this.props.submitProduct(newProductEntry)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
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
        <label htmlFor="imgURLs"> Image URLs </label>
        <input
          name="imgURL"
          value={this.state.imgURL}
          onChange={this.handleChange}
        />
        <button disabled={this.validation()} type="submit">
          {' '}
          Add Product{' '}
        </button>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  submitProduct: product => dispatch(postProducts(product))
})

export default connect(null, mapDispatchToProps)(AddProductForm)
