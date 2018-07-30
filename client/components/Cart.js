import React, {Component} from 'react'
import {connect} from 'react-redux'
import CartItem from './CartItem'
import {fetchLineItems, destroyItem} from '../store/lineItemReducer'
import {NavLink} from 'react-router-dom'
import {calculateTaxAndTotal} from '../utils'
class CartLoader extends Component {
  componentDidMount() {
    // if (this.props.user.cartId && !this.state.requested) {
    console.log('Loading Cart')
    this.props.fetchLineItemsInCart()
  }
  // componentDidUpdate() {
  //   if (!this.props.cart.lineItems.length) {
  //     console.log('Loading Cart Again')
  //     this.props.fetchLineItemsInCart()
  //   }
  // }
  deleteClicked = async targetId => {
    this.props.deleteLineitem(targetId)
  }

  render() {
    console.log('In Cart.render. this.props.cart:', this.props.cart)
    const {lineItems} = this.props.cart
    console.log('In Cart.render. this.props.lineItems:', lineItems)
    if (!this.props.cart.lineItems.length) {
      console.log('Empty. this.props.cart:', this.props.cart)
      return <h1> Loading Cart</h1>
    } else {
      const {tax, total} = calculateTaxAndTotal(lineItems)
      return (
        <div>
          Welcome to your cart! {this.props.user.cartId}
          <ul>
            {lineItems.map(item => {
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
  cart: state.cart,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  fetchLineItemsInCart: () => dispatch(fetchLineItems()),
  deleteLineitem: deleteId => dispatch(destroyItem(deleteId))
})

export default connect(mapStateToProps, mapDispatchToProps)(CartLoader)
