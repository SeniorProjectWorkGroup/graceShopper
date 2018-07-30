import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {postItem} from '../store/cartReducer'

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
          <img className="card-img-top" src={product.imageUrl} />
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

          {props.user.role === 'ADMIN' ? (
            <NavLink to={`/editProduct/${product.id}`} className="btn-primary">
              Edit Product
            </NavLink>
          ) : null}
          <button
            type="button"
            onClick={() => props.addToCart(product.id, props.user.cartId)}
          >
            {' '}
            Add to Cart{' '}
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
  addToCart: (productId, cartId) => dispatch(postItem({productId, cartId}))
})

export default connect(mapState, mapDispatch)(Product)
