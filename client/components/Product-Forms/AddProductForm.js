import React, {Component} from 'react'
import {connect} from 'react-redux'
export default class AddProductForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      numInStock: 1,
      price: 10,
      imgURLs: '',
      description: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }
  handleSubmit(evt) {
    evt.preventDefault()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="name"> Product Name </label>
        <input
          name="name"
          required={true}
          value={this.state.name}
          onChange={this.handleChange}
        />
        <label htmlFor="numInStock"> Amount of Product in Stock </label>
        <input
          required={true}
          name="numInStock"
          min="0"
          placeholder="1"
          type="Number"
          value={this.state.numInStock}
          onChange={this.handleChange}
        />
        <label htmlFor="price"> Price </label>
        <input
          required={true}
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
          required={true}
          value={this.state.description}
          onChange={this.handleChange}
          placeholder="Enter description here"
        />
        <label htmlFor="imgURLs"> Image URLs </label>
        <input
          name="imgURLs"
          value={this.state.imgURLs}
          onChange={this.handleChange}
        />
        <button type="submit"> Add Product </button>
      </form>
    )
  }
}

// const mapDispatchToProps = dispatch => ({
//   submitProduct: product => dispatch(postProduct)
// })
