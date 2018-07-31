import React, {Component} from 'react'
import {connect} from 'react-redux'
import CartItem from './CartItem'
import {fetchLineItems, destroyItem} from '../store/lineItemReducer'
import {NavLink} from 'react-router-dom'
import {calculateTaxAndTotal} from '../utils'
class CartLoader extends Component {
  componentDidMount() {
    console.log('Loading Cart')
    this.props.fetchLineItemsInCart()
  }

  deleteClicked = targetId => {
    this.props.deleteLineitem(targetId)
  }

  render() {
    const {lineItems} = this.props.cart
    if (!this.props.cart.lineItems.length) {
      return <h1 className="m-5 text-white"> Cart Appears to Be Empty</h1>
    } else {
      const {tax, total} = calculateTaxAndTotal(lineItems)
      return (
        <div className="m-5 text-white">
          Welcome to your cart!
          {/* {this.props.user.cartId} */}
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
  cart: state.cart
  // user: state.user
})

const mapDispatchToProps = dispatch => ({
  fetchLineItemsInCart: () => dispatch(fetchLineItems()),
  deleteLineitem: deleteId => dispatch(destroyItem(deleteId))
})

export default connect(mapStateToProps, mapDispatchToProps)(CartLoader)
