import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchOrdersByUser} from '../../store/orderReducer'

class OrdersView extends Component {
  componentDidMount() {
    console.log('Get the orders')
    this.props.getUserOrders(this.props.user.id)
  }

  render() {
    console.log(this.props)
    if (this.props.orders.length) {
      if (this.props.user.role === 'ADMIN') {
        return (
          <div>
            <h1> All Orders </h1>
            {this.props.orders.map(order => {
              return (
                <div key={order.id}>
                  <p> {order.product.name} </p>
                </div>
              )
            })}
          </div>
        )
      } else {
        return (
          <div>
            <h2> Your Orders </h2>
            {this.props.orders.map(order => {
              return (
                <div key={order.id}>
                  <p> {order.product.name} </p>
                </div>
              )
            })}
          </div>
        )
      }
    } else {
      return <p> Loading </p>
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

export default connect(mapState, mapDispatch)(OrdersView)
