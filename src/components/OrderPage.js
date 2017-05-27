import React, { Component } from 'react'

//import OrderItem from './OrderItem'

class OrderPage extends Component {

    constructor() {
        super()
        this.renderItems = this.renderItems.bind(this)
    }

    renderItems() {
        //return this.props.order.data.map(item => <OrderItem key={ item.id } cart={ this.props.cart } item={ item } />)
    }

    render() {
        return (
            <div className="order-items">
                { this.renderItems() }
            </div>
        )
    }
}

export default OrderPage
