import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { gateway as MoltinGateway } from '@moltin/sdk'

class Cart extends Component {

  componentWillMount() {
    const Moltin = MoltinGateway({
        client_id: 'RuIG6TZULXPmfzhIfwgJg1Evg8iKvgchkv68gIoQsu'
    })
    Moltin.Cart.Items().then((cart) => {
        this.setState({ cart: cart })
    })
  }

  render() {
    const cart = this.props.cart

    return(
      <Link to="/cart">
        <span>Cart</span>
        <div className="cart-count">
          { !cart.data ? 0 : cart.data.length }
        </div>
      </Link>
    )
  }
}

export default Cart
