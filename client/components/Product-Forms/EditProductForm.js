import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProductById} from '../../store/products/singleProduct'
import {putProductById} from '../../store/products/productsList'
import {EIDRM} from 'constants'
class AddProductForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.name || '',
      numInStock: this.props.numInStock || 1,
      price: this.props.price || 10,
      imgURL: this.props.imgURL || '',
      description: this.props.description || ''
    }
    this.submitBtn = null
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.validation = this.validation.bind(this)
  }
  componentDidMount() {
    this.props.getCurrentProduct(this.props.match.params.productId)
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
    const editedProductEntry = {
      name: this.state.name,
      numInStock: this.state.numInStock,
      price: this.state.price,
      imgURL: this.state.imgURL,
      description: this.state.description
    }
    this.props.submitProduct(
      this.props.match.params.productId,
      editedProductEntry
    )
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <h1> Edit the Product </h1>
        <form className="text-center form-group" onSubmit={this.handleSubmit}>
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
          <button
            className="flex btn-primary m-auto mt-lg-1 rounded"
            disabled={this.validation()}
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

const mapStateToProps = state => ({
  currentProduct: state.currentProduct
})
const mapDispatchToProps = dispatch => ({
  getCurrentProduct: id => dispatch(fetchProductById(id)),
  submitProduct: (productId, product) =>
    dispatch(putProductById(productId, product))
})
export default connect(mapStateToProps, mapDispatchToProps)(AddProductForm)
