import React from 'react'
import {NavLink} from 'react-router-dom'

const PaginationNav = props => {
  const {limit, offset, max} = props
  const nextOffset = offset + limit
  const prevOffset = Math.max(0, offset - limit)
  return (
    <div className="pagination-nav">
      {/* The 'Previous Page' button */}
      {offset > 0 ? (
        <NavLink to={`/products?limit=${limit}&offset=${prevOffset}`}>
          <img src="/icons/chevron-left.png" />
          <b>Previous Page</b>
        </NavLink>
      ) : (
        <span>
          <img src="/icons/chevron-left-disabled.png" />
          <b>Previous Page</b>
        </span>
      )}
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      {/* The 'Next Page' button */}
      {nextOffset < max ? (
        <NavLink to={`/products?limit=${limit}&offset=${nextOffset}`}>
          <b>Next Page</b>
          <img src="/icons/chevron-right.png" />
        </NavLink>
      ) : (
        <span>
          <b>Next Page</b>
          <img src="/icons/chevron-right-disabled.png" />
        </span>
      )}
    </div>
  )
}

export default PaginationNav
