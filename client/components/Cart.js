import React from 'react'
import {connect} from 'react-redux'
import CartItem from './CartItem'

function Cart(props) {
  return (
    <div>
      <ul>
        {props.cartItems.map(item => <CartItem item={item} key={item.id} />)}
      </ul>
    </div>
  )
}

const mapStateToProps = ({cart = []}) => ({
  cartItems: cart
})

export default connect(mapStateToProps)(Cart)
