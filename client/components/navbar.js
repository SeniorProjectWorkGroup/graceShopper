import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, userRole}) => (
  <nav>
    {isLoggedIn ? (
      <div className="flex">
        {/* The navbar will show these links after you log in */}
        <Link to="/home">Home</Link>
        {userRole === 'ADMIN' ? (
          <Fragment>
            <Link to="/addProduct"> Add Product </Link>
            <Link to="/editProduct"> Edit Product </Link>
          </Fragment>
        ) : null}
        <a href="#" onClick={handleClick}>
          Logout
        </a>
      </div>
    ) : (
      <div className="flex">
        {/* The navbar will show these links before you log in */}
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    )}
    <div className="cartIcon">
      <img src="data:image/png;base64,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" />
    </div>
  </nav>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    userRole: state.user.role
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
