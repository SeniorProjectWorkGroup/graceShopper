import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import {Elements, StripeProvider} from 'react-stripe-elements'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome, ProductList, Cart} from './components'
import {me} from './store'
import AddProductForm from './components/Product-Forms/AddProductForm'
import EditProductForm from './components/Product-Forms/EditProductForm'
import SingleProductPage from './components/SingleProductPage';
import AdminUserManagement from './components/Admin/AdminUserManagement'
import CheckoutForm from './components/CheckoutForm'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/products" component={ProductList} />
        <Route path="/products/:id" component={SingleProductPage} />
        <Route path="/cart" component={Cart} />
        <Route exact path="/" render={() => <Redirect to="/products" />} />
        <Route
          path="/checkout"
          render={routeProps => (
            <StripeProvider apiKey="pk_test_oAeGHI2qYF1MucHECmbLFF5i">
              <div className="example">
                <h1>Please enter payment information</h1>
                <Elements>
                  <CheckoutForm {...routeProps} />
                </Elements>
              </div>
            </StripeProvider>
          )}
        />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/" render={() => <Redirect to="/products" />} />
            <Route path="/home" component={UserHome} />
            <Route
              path="/addProduct"
              render={routeProps => <AddProductForm {...routeProps} />}
            />
            <Route
              path="/editProduct/:productId"
              render={routeProps => <EditProductForm {...routeProps} />}
            />
            <Route
              path="/users"
              render={routeProps => <AdminUserManagement {...routeProps} />}
            />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
