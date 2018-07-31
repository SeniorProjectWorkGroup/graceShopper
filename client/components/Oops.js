import React from 'react'
import {NavLink} from 'react-router-dom'

export const Oops = () => {
  return (
    <div id="error-page">
      <h3>Oh no...</h3>
      <h4>Something went wrong</h4>
      <img src="/fail.jpg" />

      <NavLink to={`/products`} className="btn-primary">
        Run away
      </NavLink>
    </div>
  )
}
