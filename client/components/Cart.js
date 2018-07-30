import React, {Component} from 'react'
import {connect} from 'react-redux'
import CartItem from './CartItem'
import {fetchCart} from '../store/cartReducer'
import {NavLink} from 'react-router-dom'

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
    console.log('user', this.props.user)
    if (this.props.user.cartId && !this.state.requested) {
      this.props.loadCart(this.props.user.cartId)
      this.setState({requested: true})
    }
  }

  render() {
    if (!this.props.user.cartId) {
      return <h1> Loading Cart</h1>
    } else {
      /*Calculate Vitual Variables for Total and Tax*/
      const sumTotal = this.props.cartItems.reduce((sum, item) => {
        sum = sum + item.product.price * item.quantity
        return sum
      }, 0)
      const tax = Math.round(0.0875 * sumTotal * 100) / 100
      const total = Math.round((tax + sumTotal) * 100) / 100

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
                />
              )
            })}
          </ul>
          <div>Tax: {tax}</div>
          <div>Total: {total}</div>
          <NavLink to={`/checkout`} className="btn-primary">
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
  loadCart: id => dispatch(fetchCart(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(CartLoader)
