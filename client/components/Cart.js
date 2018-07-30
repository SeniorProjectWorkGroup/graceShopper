import React, {Component} from 'react'
import {connect} from 'react-redux'
import CartItem from './CartItem'
import {fetchCart, destroyItem} from '../store/cartReducer'
import {NavLink} from 'react-router-dom'
import {calculateTaxAndTotal} from '../utils'
class CartLoader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      requested: false
    }
  }
  componentDidMount() {
    if (this.props.user.cartId && !this.state.requested) {
      this.props.loadCart(this.props.user.cartId)
      this.setState({requested: true})
    }
  }

  componentDidUpdate() {
    if (this.props.user.cartId && !this.state.requested) {
      this.props.loadCart(this.props.user.cartId)
      this.setState({requested: true})
    }
  }

  deleteClicked = async targetId => {
    this.props.deleteLineitem(targetId)
  }

  render() {
    if (!this.props.user.cartId) {
      return <h1> Loading Cart</h1>
    } else {
      const {tax, total} = calculateTaxAndTotal(this.props.cartItems)
      return (
        <div>
          Welcome to your cart! {this.props.user.cartId}
          <ul>
            {this.props.cartItems.map(item => {
              return (
                <CartItem
                  quantity={item.quantity}
                  item={item.product}
                  key={item.id}
                  itemId={item.id}
                  deleteClicked={this.deleteClicked}
                />
              )
            })}
          </ul>
          <div>Tax: {tax}</div>
          <div>Total: {total}</div>
          <NavLink to="/checkout" className="btn-primary">
            Checkout!
          </NavLink>
        </div>
      )
    }
  }
}
const mapStateToProps = state => ({
  cartItems: state.cart,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  loadCart: id => dispatch(fetchCart(id)),
  deleteLineitem: deleteId => dispatch(destroyItem(deleteId))
})

export default connect(mapStateToProps, mapDispatchToProps)(CartLoader)
