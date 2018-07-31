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
          <div>
            <button value="ALL" onClick={this.handleClick} type="button">
              {' '}
              ALL
            </button>
            <button value="COMPLETE" onClick={this.handleClick} type="button">
              {' '}
              COMPLETE
            </button>
            <button value="CREATED" onClick={this.handleClick} type="button">
              {' '}
              CREATED
            </button>
            <button value="PROCESSING" onClick={this.handleClick} type="button">
              {' '}
              PROCESSING
            </button>
            <button value="CANCELED" onClick={this.handleClick} type="button">
              {' '}
              CANCELED
            </button>
          </div>
          {this.props.orders.map(order => {
            const {productOrders} = order
            return (
              <div className="orderCard" key={order.id}>
                <NavLink to={`/orders/${order.id}`}>
                  <span className="product-name">Order: {order.id}</span>
                </NavLink>

                {order.user && (
                  <Fragment>
                    <h4> Completed by {order.user.name} </h4>
                    <h5> at {order.user.email} </h5>{' '}
                  </Fragment>
                )}
                <div className="flex">
                  <div className="flexDown">
                    <p>Order Placed </p>
                    <p> {new Date(order.createdAt).toString().slice(0, 16)} </p>
                  </div>
                  <div className="flexDown">
                    <p>Total</p>
                    <p> {order.totalSale} </p>
                  </div>
                  <div className="flexDown">
                    <p>Ship To</p>
                    <p>{order.addressAtPurchase}</p>
                  </div>
                  <div className="flexDown">
                    <p>Status</p>
                    <p>{order.status}</p>
                  </div>
                </div>
                {productOrders.map(orderItem => (
                  <div key={orderItem.id} className="flex">
                    <div>
                      {/* <img src={`/${orderItem.product.imageUrl}`} /> */}
                    </div>
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
