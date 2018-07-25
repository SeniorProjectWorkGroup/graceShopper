import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import productList from './products/productsList'
import currentProduct from './products/singleProduct'
import {categories} from './category'
import {displayedProducts} from './products/displayedProducts'

const reducer = combineReducers({
  user,
  productList,
  categories,
  currentProduct,
  displayedProducts
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
