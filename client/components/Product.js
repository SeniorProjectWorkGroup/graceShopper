import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {addItemToCartInServer} from '../store/lineItemReducer'

function Product(props) {
  const product = props.product
  return (
    <div>
      <li className="card">
        <div
          className="top-of-card"
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <NavLink to={`/products/${product.id}`}>
            <span className="product-name">{product.name}</span>
          </NavLink>
          <span className="product-price">${product.price}</span>
        </div>
        <NavLink to={`/products/${product.id}`}>
          <img className="productCardImg" src={product.imageUrl} />
        </NavLink>

        <div className="card-body">
          <span className="card-title">
            {product.numInStock} left in stock!
          </span>
          <span
            key={product.description}
            className="card-subtitle mb-2 text-muted"
          >
            {product.description.slice(0, 70) + '...'}
          </span>

          {/* Only Admin has an editProduct button */}
          {props.user.role === 'ADMIN' && (
            <NavLink to={`/editProduct/${product.id}`} className="btn-primary">
              Edit Product
            </NavLink>
          )}
          <button
            className="m-1 cartBtn"
            type="button"
            onClick={() => props.addToCart(product.id, props.user.cartId)}
          >
            Add to Cart
          </button>
        </div>
      </li>
    </div>
  )
}

const mapState = state => ({
  user: state.user
})

const mapDispatch = dispatch => ({
  addToCart: (productId, cartId) =>
    dispatch(addItemToCartInServer({productId, cartId}))
})

export default connect(mapState, mapDispatch)(Product)
