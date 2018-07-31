import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {CardElement, injectStripe} from 'react-stripe-elements'
import {fetchCart} from '../store/cartReducer'
import {calculateTaxAndTotal} from '../utils'
import history from '../history'
import {postOrders} from '../store/orderReducer'
import {removeFromCart} from '../store/lineItemReducer'

const states = [
  'AL',
  'AK',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'FL',
  'GA',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY'
]

class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
    this.state = {
      complete: false,
      name: '',
      addressStreet: '',
      addressState: '',
      addressCity: '',
      addressZip: '',
      status: 'CREATED'
    }
    this.handleChange = this.handleChange.bind(this)
    this.validation = this.validation.bind(this)
  }

  validation() {
    return (
      this.state.name.length === 0 ||
      this.state.addressStreet.length === 0 ||
      this.state.addressState < 0 ||
      this.state.addressCity.length === 0 ||
      this.state.addressZip < 0
    )
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  async submit(ev) {
    // User clicked submit
    const {total} = calculateTaxAndTotal(this.props.cartItems)
    ev.preventDefault()
    let {token} = await this.props.stripe.createToken({name: 'Name'})
    // build new order to thunk out
    const newOrderEntry = {
      name: this.state.name,
      addressAtPurchase: this.state.addressStreet,
      dateOfPurchase: new Date(),
      userId: this.props.user.id,
      status: this.state.status,
      token: token.id,
      amount: total
    }
    await this.props.submitOrder(newOrderEntry)
    console.log('Purchase Complete!')
    this.setState({complete: true})
    await this.props.clearCart(this.props.cartItems)
    history.push('/home')

    //rewrite this using api routes
    // let response = await fetch('/orders', {
    //   method: 'POST',
    //   headers: {'Content-Type': 'text/plain'},
    //   body: token.id
    // })

    // if (response.ok) this.setState({complete: true})
    // console.log('Purchase Complete!')
    // history.push('/')
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>
    const {tax, total} = calculateTaxAndTotal(this.props.cartItems)
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>

        <CardElement />
        <form>
          Shipping Information
          <label htmlFor="name"> Name </label>
          <input
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <label htmlFor="addressStreet"> Street </label>
          <input
            name="addressStreet"
            value={this.state.addressStreet}
            onChange={this.handleChange}
          />
          <label htmlFor="addressCity"> City </label>
          <input
            name="addressCity"
            value={this.state.addressCity}
            onChange={this.handleChange}
          />
          <label htmlFor="state"> State </label>
          <select
            name="addressState"
            className="form-control"
            value={this.state.addressState}
            onChange={this.handleChange}
          >
            {states.map(state => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          <label htmlFor="addressZip"> Zipcode </label>
          <input
            name="addressZip"
            value={this.state.addressZip}
            onChange={this.handleChange}
          />
          <button disabled={this.validation()} onClick={this.submit}>
            Send
          </button>
        </form>
        <div className="cart-review">
          Review your cart
          {this.props.cartItems.map(item => {
            console.log(this.props.cartItems)

            return (
              <div key={item.id}>
                <li className="cart-item list-unstyled">
                  <a>
                    <img className="item-img" src={item.product.imageUrl} />
                  </a>

                  <div className="item-body flexDown">
                    <span className="item-name">{item.product.name}</span>
                    <span className="item-price">
                      {Math.round(item.product.price * item.quantity * 100) /
                        100}
                    </span>
                  </div>
                </li>
              </div>
            )
          })}
          <div>Tax: {tax}</div>
          <div>Total: {total}</div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  cartItems: state.cart,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  loadCart: id => dispatch(fetchCart(id)),
  submitOrder: order => dispatch(postOrders(order)),
  clearCart: cart =>
    cart.map(item => {
      dispatch(removeFromCart(item))
    })
})

const injectedForm = injectStripe(CheckoutForm)

export default connect(mapStateToProps, mapDispatchToProps)(injectedForm)
