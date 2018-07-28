import React, {Component} from 'react'
import {connect} from 'react-redux'
import CartItem from './CartItem'
import {fetchCart} from '../store/cartReducer'

let i = 1

function Cart(props) {
  return (
    <div>
      Welcome to your cart!
      <ul>
        console.log(props)
        {props.cartItems.map(item => <CartItem item={item} key={item.id} />)}
      </ul>
    </div>
  )
}

class CartLoader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      requested: false
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
    // return <Cart {...this.props} />
    if (!this.props.user.cartId) {
      return <h1> Loading Cart</h1>
    } else {
      const sumTotal = this.props.cartItems.reduce((sum, item) => {
        sum = sum + item.product.price
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
                />
              )
            })}
          </ul>
          <div>Tax: {tax}</div>
          <div>Total: {total}</div>
          <button type="button" className="btn-primary">
            Checkout
          </button>
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
