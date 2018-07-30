import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchOrdersByUser} from '../store/orderReducer'

class OrdersView extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {}

  render() {
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
}

const mapDispatch = dispatch => ({
  getUserOrders: id => dispatch(fetchOrdersByUser(id))
})

const mapState = state => ({
  user: state.user
})

export default connect(mapState, mapDispatch)(OrdersView)
