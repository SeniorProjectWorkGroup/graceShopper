import React from 'react'
import {connect} from 'react-redux'
import {putItem} from '../store/cartReducer'

class CartItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editClicked: false,
      quantity: this.props.quantity
    }
  }
  handleChange = evt => {
    this.setState({quantity: evt.target.value})
  }
  editItem = () => {
    if (this.state.editClicked) {
      this.props.submitEdit(this.props.itemId, {
        quantity: parseInt(this.state.quantity, 10)
      })
      this.setState({editClicked: false})
    } else {
      this.setState({editClicked: true})
    }
  }
  handleDelete = evt => {
    evt.preventDefault()
    this.props.deleteClicked(this.props.itemId)
  }

  render() {
    const {item} = this.props
    return (
      <div>
        <li className="cart-item list-unstyled">
          <a>
            <img className="item-img" src={item.imageUrl} />
          </a>

          <div className="item-body flexDown">
            <span className="item-name">{item.name}</span>
            <span className="item-price">
              {Math.round(item.price * this.props.quantity * 100) / 100}
            </span>
            <div className="flex">
              <input
                type="Number"
                name="quantity"
                min="1"
                disabled={!this.state.editClicked}
                step="1"
                value={this.state.quantity}
                onChange={this.handleChange}
                className="item-quantity"
              />
              <button type="button" onClick={this.editItem}>
                {this.state.editClicked ? 'SAVE' : 'EDIT'}
              </button>

              <button
                onClick={this.handleDelete}
                className="btn-warning"
                type="button"
              >
                {' '}
                Remove Item{' '}
              </button>
            </div>
          </div>
        </li>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  submitEdit: (editedId, editedQuantity) => {
    dispatch(putItem(editedId, editedQuantity))
  }
})
const mapState = state => ({
  user: state.user
})

export default connect(mapState, mapDispatch)(CartItem)
