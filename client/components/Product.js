import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
function Product(props) {
  const product = props.product
  return (
    <div>
      <li className="product">
        <a>
          <img className="product-img" src={product.imageUrl} />
        </a>

        <div className="product-body">
          <NavLink to={`/products/${product.id}`}>
            <span className="product-name">{product.name}</span>
          </NavLink>
          <span className="product-price">{product.price}</span>
          <span className="product-numInStock">{product.numInStock}</span>
          {product.categories.map(category => {
            return (
              <span key={category.id} className="product-category">
                {category.name}
              </span>
            )
          })}
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
