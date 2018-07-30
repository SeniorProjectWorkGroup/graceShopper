import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {CardElement, injectStripe} from 'react-stripe-elements'
import {fetchCart} from '../store/cartReducer'
import {calculateTaxAndTotal} from '../utils'

class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
    this.state = {complete: false}
  }

  async submit(ev) {
    // User clicked submit
    let {token} = await this.props.stripe.createToken({name: 'Name'})

    //rewrite this using api routes
    let response = await fetch('/orders', {
      method: 'POST',
      headers: {'Content-Type': 'text/plain'},
      body: token.id
    })

    if (response.ok) this.setState({complete: true})
    console.log('Purchase Complete!')
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>
    const {tax, total} = calculateTaxAndTotal(this.props.cartItems)
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Send</button>

        <div>
          Review your cart
          {this.props.cartItems.map(item => {
            console.log(this.props.user)

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
                <div>Tax: {tax}</div>
                <div>Total: {total}</div>
              </div>
            )
          })}
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
  loadCart: id => dispatch(fetchCart(id))
})

const injectedForm = injectStripe(CheckoutForm)

export default connect(mapStateToProps, mapDispatchToProps)(injectedForm)
