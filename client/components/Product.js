import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
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
          <span className="product-price">{product.price}</span>
        </div>
        <a>
          <img className="card-img-top" src={product.imageUrl} />
        </a>

        <div className="card-body">
          <span className="card-title">
            {product.numInStock} left in stock!
          </span>
          {/* {product.categories.map(category => { */}
            {/* return ( */}
              <span key={product.description} className="card-subtitle mb-2 text-muted">
                {product.description}
              </span>
            {/* )
          })} */}
          {props.user.role === 'ADMIN' ? (
            <NavLink to={`/editProduct/${product.id}`} className="btn-primary">
              Edit Product
            </NavLink>
          ) : null}
        </div>
      </li>
    </div>
  )
}

const mapState = state => ({
  user: state.user
})

export default connect(mapState)(Product)
