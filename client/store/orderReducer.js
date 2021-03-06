import axios from 'axios'

//ACTION TYPES
const GET_ORDERS = 'GET_ORDERS'
const GET_USER_ORDERS = 'GET_USER_ORDERS'
const CREATE_ORDER = 'CREATE_ORDER'
const DELETE_ORDER = 'DELETE_ORDER'
const EDIT_ORDER = 'EDIT_ORDER'
const GOT_ORDERS_BY_STATUS = 'GOT_ORDERS_BY_STATUS'
const GOT_ORDER_BY_ID = 'GOT_ORDER_BY_ID'

//ACTION CREATORS
const getOrders = orders => ({
  type: GET_ORDERS,
  orders
})

const createOrder = order => ({
  type: CREATE_ORDER,
  order
})

const getUserOrders = orders => ({
  type: GET_USER_ORDERS,
  orders
})

const deleteOrder = deletedId => ({
  type: DELETE_ORDER,
  deletedId
})

const editOrder = (editedId, updatedOrder) => ({
  type: EDIT_ORDER,
  editedId,
  updatedOrder
})

const gotOrdersByStatus = ordersByStatus => ({
  type: GOT_ORDERS_BY_STATUS,
  ordersByStatus
})
const gotOrderById = orderById => ({
  type: GOT_ORDER_BY_ID,
  orderById
})

//THUNK CREATORS
export const fetchAllOrders = () => {
  return async dispatch => {
    const {data: orders} = await axios.get('/api/orders')
    dispatch(getOrders(orders))
  }
}

//need create order thunk

export const fetchOrdersByUser = userId => {
  return async dispatch => {
    const {data: userOrders} = await axios.get(`/api/orders/user/${userId}`)
    dispatch(getUserOrders(userOrders))
  }
}
export const fetchOrdersByStatus = statusType => {
  return async dispatch => {
    const {data: statusOrders} = await axios.get(
      `/api/orders/status/${statusType}`
    )
    dispatch(gotOrdersByStatus(statusOrders))
  }
}
export const fetchOrderById = orderId => {
  return async dispatch => {
    const {data: singleOrder} = await axios.get(`/api/orders/${orderId}`)
    dispatch(gotOrderById(singleOrder))
  }
}

export const postOrders = order => {
  return async dispatch => {
    const {data} = await axios.post('/api/orders', order)
    dispatch(createOrder(data))
  }
}

export const putOrderById = (orderId, orderUpdated) => {
  return async dispatch => {
    const {data: editResponse} = await axios.put(
      `/api/orders/${orderId}`,
      orderUpdated
    )
    dispatch(editOrder(orderId, editResponse.editedOrder))
  }
}

export const destroy = orderId => {
  return async dispatch => {
    await axios.delete(`/api/orders/${orderId}`)
    dispatch(deleteOrder(orderId))
  }
}

const orderReducer = (orders = [], action) => {
  // console.log('in orderreducer. orders:', orders, 'action:', action)
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    case GOT_ORDER_BY_ID:
      return [action.orderById]
    case GOT_ORDERS_BY_STATUS:
      return action.ordersByStatus
    case GET_USER_ORDERS:
      return action.orders
    case CREATE_ORDER:
      return [...orders, action.order]
    case DELETE_ORDER: {
      const filteredOrder = orders.filter(order => {
        return order.id !== action.deletedId
      })
      return filteredOrder
    }
    case EDIT_ORDER: {
      const updatedOrdersList = orders.map(order => {
        if (order.id === action.editedId) return action.updatedOrder
        else return order
      })
      return updatedOrdersList
    }
    default:
      return orders
  }
}

export default orderReducer
