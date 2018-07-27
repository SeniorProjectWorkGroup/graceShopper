import React from 'react'
import {connect} from 'react-redux'
import {removeFromCart, addToCart} from '../store/lineItemReducer'

function CartItem(props) {
  const item = props.item
  return (
    <div>
      <li className="cart-item">
        <a>
          <img className="item-img" src={item.imageUrl} />
        </a>

        <div className="item-body">
          <span className="item-name">{item.name}</span>
          <span className="item-price">{item.price}</span>
          <button
            type="button"
            onClick={() => props.dispatch(removeFromCart(item))}
          >
            -
          </button>
          <span className="item-quantity">{item.quantity}</span>
          <button type="button" onClick={() => props.dispatch(addToCart(item))}>
            +
          </button>
        </div>
      </li>
    </div>
  )
}

const mapState = state => ({
  user: state.user
})

export default connect(mapState)(CartItem)
