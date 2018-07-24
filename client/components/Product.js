import React from 'react'
import {NavLink} from 'react-router-dom'

function Product(props) {
  const product = props.product
  return (
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
      </div>
    </li>
  )
}

export default Product
