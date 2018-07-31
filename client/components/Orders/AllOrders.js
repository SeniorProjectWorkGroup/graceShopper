import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAllOrders} from '../../store/orderReducer'

class AllOrders extends Component {
  componentDidMount() {
    this.props.getAllOrders()
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
  getAllOrders: () => dispatch(fetchAllOrders())
})

const mapState = state => ({
  user: state.user,
  orders: state.orders
})

export default connect(mapState, mapDispatch)(AllOrders)
