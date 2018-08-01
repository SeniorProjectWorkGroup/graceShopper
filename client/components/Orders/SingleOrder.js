import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {fetchOrderById, putOrderById} from '../../store/orderReducer'

class SingleOrderView extends Component {
  state = {
    status: 'CREATED'
  }
  async componentDidMount() {
    await this.props.getOrderById(this.props.match.params.orderId)
    this.setState({status: this.props.singleOrder[0].status})
  }
  handleChange = evt => {
    this.setState({status: evt.target.value})
  }
  handleSubmit = evt => {
    evt.preventDefault()
    this.props.changeOrderStatus(this.props.singleOrder[0].id, {
      status: this.state.status,
      addressAtPurchase: this.props.singleOrder[0].addressAtPurchase
    })
  }

  render() {
    if (this.props.singleOrder.length) {
      const singleOrder = this.props.singleOrder[0]
      return (
        <div className="m-5 text-white">
          <h2> Order {singleOrder.id} </h2>
          {singleOrder.user && (
            <Fragment>
              <h4> Completed by {singleOrder.user.name} </h4>
              <h5> at {singleOrder.user.email} </h5>
            </Fragment>
          )}{' '}
          <p>
            Submitted on{' '}
            {new Date(singleOrder.createdAt).toString().slice(0, 16)}{' '}
          </p>
          {this.props.singleOrder.map(order => {
            const {productOrders} = order
            return (
              <div className="orderCard" key={order.id}>
                <div className="flexDown">
                  <p>Total: ${order.totalSale}</p>
                </div>
                <div className="flexDown">
                  <p>Ship To {order.addressAtPurchase}</p>
                </div>
                <div className="flexDown">
                  <form onSubmit={this.handleSubmit}>
                    <label htmlFor="status"> Order Status </label>
                    <select
                      value={this.state.status}
                      onChange={this.handleChange}
                    >
                      <option value="PROCESSING">PROCESSING</option>
                      <option value="COMPLETE">COMPLETE</option>
                      <option value="CREATED">CREATED</option>
                      <option value="CANCELED">CANCELED</option>
                    </select>
                    <button type="submit"> SAVE </button>
                  </form>
                </div>
                {productOrders.map(orderItem => (
                  <div key={orderItem.id} className="flex orderItem mt-2">
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
      return <p> This Doesn't Appear to Exist </p>
    }
  }
}

const mapDispatch = dispatch => ({
  getOrderById: orderId => dispatch(fetchOrderById(orderId)),
  changeOrderStatus: (orderId, updatedOrder) =>
    dispatch(putOrderById(orderId, updatedOrder))
})

const mapState = state => ({
  user: state.user,
  singleOrder: state.orders
})

export default connect(mapState, mapDispatch)(SingleOrderView)
