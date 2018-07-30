import axios from 'axios'
import {combineReducers} from 'redux'
import lineItemReducer from './lineItemReducer'

//REDUCER
const cartReducer = combineReducers({lineItems: lineItemReducer})

export default cartReducer
