import React, {Component} from 'react'
import {connect} from 'react-redux'
import CartItem from './CartItem'
import {fetchCart} from '../store/cartReducer'

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
  async componentDidMount() {
    //Fetch the user's cart

    await this.props.loadCart(this.props.user.cartId)
  }
  render() {
    // return <Cart {...this.props} />
    console.log('hey there', this.props)
    return (
      <div>
        Welcome to your cart! {this.props.user.cartId}
        <ul>
          {/* {this.props.cartItems.map(item => ( */}
          {/* <CartItem item={item} key={item.id} /> */}
          {/* ))} */}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  // cartItems: state.cart,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  loadCart: id => dispatch(fetchCart(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(CartLoader)
