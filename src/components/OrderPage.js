import React, { Component } from 'react'

import OrderItem from './OrderItem'

class OrderPage extends Component {

  renderItems() {
    return this.props.cart.data.map(item => <OrderItem key={ item.id } item={ item } />)
  }

  render() {
    const cart = this.props.cart

    return (
      <div>
        <span>Total price: <strong>{ cart.meta.display_price.with_tax.formatted }</strong></span>
        <div className="items">
          { this.renderItems.bind(this) }
        </div>
        <span className="shipping-title">Select your shipping options:</span>
        <select>
          <option>Select 1</option>
        </select>
      </div>
    )
  }
}

export default OrderPage
