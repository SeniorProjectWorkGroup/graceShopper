import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {fetchAllOrders, fetchOrdersByStatus} from '../../store/orderReducer'

class AllOrders extends Component {
  componentDidMount() {
    this.props.getAllOrders()
  }
  handleClick = evt => {
    console.log(evt.target.value)
    if (evt.target.value === 'ALL') this.props.getAllOrders()
    else {
      this.props.getOrdersByStatus(evt.target.value)
    }
  }

  render() {
    if (this.props.orders.length) {
      return (
        <div className="text-white m-5">
          <h2> All Orders </h2>
          <div className="btn-group m-3">
            <button
              className="btn"
              value="ALL"
              onClick={this.handleClick}
              type="button"
            >
              ALL
            </button>
            <button
              className="btn"
              value="COMPLETE"
              onClick={this.handleClick}
              type="button"
            >
              COMPLETE
            </button>
            <button
              className="btn"
              value="CREATED"
              onClick={this.handleClick}
              type="button"
            >
              CREATED
            </button>
            <button
              className="btn"
              value="PROCESSING"
              onClick={this.handleClick}
              type="button"
            >
              PROCESSING
            </button>
            <button
              className="btn"
              value="CANCELED"
              onClick={this.handleClick}
              type="button"
            >
              CANCELED
            </button>
          </div>
          {this.props.orders.map(order => {
            const {productOrders} = order
            return (
              <div className="orderCard" key={order.id}>
                <div className="orderHead">
                  <NavLink to={`/orders/${order.id}`}>
                    <span className="product-name">Order: {order.id}</span>
                  </NavLink>

                  {order.user && (
                    <Fragment>
                      <h4> Completed by {order.user.name} </h4>
                      <h5> at {order.user.email} </h5>{' '}
                    </Fragment>
                  )}
                </div>
                <div className="flex cabin">
                  <div className="flexDown orderInfo">
                    <p>Order Placed </p>
                    <p> {new Date(order.createdAt).toString().slice(0, 16)} </p>
                  </div>
                  <div className="flexDown orderInfo">
                    <p>Total</p>
                    <p> {order.totalSale} </p>
                  </div>
                  <div className="flexDown orderInfo">
                    <p>Ship To</p>
                    <p>{order.addressAtPurchase}</p>
                  </div>
                  <div className="flexDown orderInfo">
                    <p>Status</p>
                    <p>{order.status}</p>
                  </div>
                </div>
                {productOrders.map(orderItem => (
                  <div key={orderItem.id} className="flex orderItem">
                    <img src={`/${orderItem.product.imageUrl}`} />
                    <div className="flexDown">
                      <NavLink to={`/products/${orderItem.product.id}`}>
                        <span className="product-name">
                          {orderItem.product.name}
                        </span>
                      </NavLink>

                      <p>${orderItem.product.price}</p>
                      <p> Quantity: {orderItem.quantity} </p>
                    </div>
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      )
    } else {
      return <p> Loading </p>
    }
  }
}

const mapDispatch = dispatch => ({
  getAllOrders: () => dispatch(fetchAllOrders()),
  getOrdersByStatus: status => dispatch(fetchOrdersByStatus(status))
})

const mapState = state => ({
  user: state.user,
  orders: state.orders
})

export default connect(mapState, mapDispatch)(AllOrders)
