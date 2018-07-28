import React from 'react'
import {connect} from 'react-redux'
import {removeFromCart, addToCart} from '../store/lineItemReducer'

function CartItem(props) {
  const {item} = props
  return (
    <div>
      <li className="cart-item list-unstyled">
        <a>
          <img className="item-img" src={item.imageUrl} />
        </a>

        <div className="item-body flexDown">
          <span className="item-name">{item.name}</span>
          <span className="item-price">{item.price}</span>
          <div className="flex">
            <button
              type="button"
              onClick={() => props.dispatch(removeFromCart(item))}
            >
              -
            </button>
            <span className="item-quantity">{props.quantity}</span>
            <button
              type="button"
              onClick={() => props.dispatch(addToCart(item))}
            >
              +
            </button>
          </div>
        </div>
      </li>
    </div>
  )
}

const mapState = state => ({
  user: state.user
})

export default connect(mapState)(CartItem)
