import React from 'react'
import {NavLink} from 'react-router-dom'

const PaginationNav = props => {
  const {limit, offset} = props
  const newOffset = offset + limit
  return (
    <div>
    <NavLink to={`/products?limit=${limit}&offset=${newOffset}`}>
      Next Page >>
    </NavLink>
    </div>
  )
}

export default PaginationNav
