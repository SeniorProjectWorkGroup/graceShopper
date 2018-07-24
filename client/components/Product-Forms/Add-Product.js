import React, {Component} from 'react'
import {connect} from 'react-redux'
export default class AddProductForm extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleChange = this.handleChange.bind(this)
    this.handleSumbit = this.handleSumbit.bind(this)
  }

  handleChange(evt) {
    this.setState({[evt.name]: evt.value})
  }
  handleSumbit(evt) {
    evt.preventDefault()
    console.log(this.state)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="name"> Product Name </label>
        <input
          name="name"
          value={this.state.test}
          onChange={this.handleChange}
        />
        <label htmlFor="numInStock"> Amount of Product in Stock </label>
        <input
          name="numInStock"
          type="Number"
          value={this.state.test}
          onChange={this.handleChange}
        />
        <label htmlFor="price"> Price </label>
        <input
          name="price"
          type="Number"
          value={this.state.test}
          onChange={this.handleChange}
        />
        <label htmlFor="description"> Product Description </label>
        <textarea
          name="description"
          value={this.state.test}
          onChange={this.handleChange}
          placeholder="Enter description here"
        />
        <label htmlFor="imgURLs"> Image URLs </label>
        <input
          name="imgURLs"
          value={this.state.test}
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
