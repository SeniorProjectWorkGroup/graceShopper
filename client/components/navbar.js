import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import history from '../history'

const Navbar = ({handleClick, isLoggedIn, userRole, cartId}) => (
  <nav className="nav nav-pills nav-justified">
    {/* Display this navigation when user is logged in */}
    <div className="title-container">
      <h4 className="cabin ml-4 mt-3 navTitle"> The QuarterMaster </h4>
      <div>The number one site for larping equipment</div>
    </div>
    <div>
      <Link className="nav-item cabin" to="/home">
        <div>
          <img className="nav-icon" src="/icons/tower.svg" />
        </div>
        <div>Home</div>
      </Link>
    </div>
    <div>
      <Link className="nav-item cabin" to="/products">
        <div>
          <img className="nav-icon" src="/icons/coins-outlined.svg" />
        </div>
        <div>Shop Products</div>
      </Link>
    </div>
    {isLoggedIn && (
      <Fragment>
        <div>
          {/* The navbar will show these links after you log in */}
          <Link className="nav-item cabin" to="/orders">
            <div>
              <img className="nav-icon" src="/icons/chest-outlined.svg" />
            </div>
            <div>Orders</div>
          </Link>
        </div>
        {userRole === 'ADMIN' && (
          <Fragment>
            <Link className="nav-item cabin" to="/addProduct">
              Add Product
            </Link>
            <Link className="nav-item cabin" to="/manageOrders">
              Manage Orders
            </Link>
            <Link className="nav-item cabin" to="/users">
              Edit Users
            </Link>
          </Fragment>
        )}
        <div>
          <a className="cabin" href="#" onClick={handleClick}>
            <div>
              <img className="nav-icon" src="/icons/logout-swords.svg" />
            </div>
            <div>Logout</div>
          </a>
        </div>
      </Fragment>
    )}
    {/* Display this navigation when user is not logged in */}
    {!isLoggedIn && (
      <div className="flex">
        {/* The navbar will show these links before you log in */}
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    )}

    {/*  history.push(`/cart/${cartId}`)*/}
    <div
      className="cartIcon"
      onClick={() => {
        history.push(`/cart`)
      }}
    >
      <Link className="nav-item cabin" to="/cart">
        <div>
          <img src="/icons/backpack.svg" />
        </div>
        <div>Cart</div>
      </Link>
    </div>
  </nav>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    userRole: state.user.role,
    cartId: state.user.cartId
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
