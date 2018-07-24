import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import productList from './products/productsList'
import currentProduct from './products/singleProduct'
const reducer = combineReducers({user, productList, currentProduct})
import {categories} from './category'

const reducer = combineReducers({
  user,
  productList,
  categories
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
