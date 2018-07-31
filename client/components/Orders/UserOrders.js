import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {fetchOrdersByUser} from '../../store/orderReducer'

class UserOrders extends Component {
  componentDidMount() {
    this.props.getUserOrders(this.props.user.id)
  }

  render() {
    if (this.props.orders.length) {
      return (
        <div className="m-5 text-white">
          <h2> Your Orders </h2>
          {this.props.orders.map(order => {
            const {productOrders} = order
            return (
              <div className="orderCard" key={order.id}>
                Order: {order.id}
                <div className="flex">
                  <div className="flexDown">
                    <p>Order Placed </p>
                    <p> {new Date(order.createdAt).toString().slice(0, 16)} </p>
                  </div>
                  <div className="flexDown">
                    <p>Total</p>
                    <p> TDB</p>
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
      return (
        <p className="m-5 text-white">
          {' '}
          You do not appear to have any past orders{' '}
        </p>
      )
    }
  }
}

const mapDispatch = dispatch => ({
  getUserOrders: id => dispatch(fetchOrdersByUser(id))
})

const mapState = state => ({
  user: state.user,
  orders: state.orders
})

export default connect(mapState, mapDispatch)(UserOrders)
