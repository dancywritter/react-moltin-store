import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { gateway as MoltinGateway } from '@moltin/sdk'
import { updateCart } from '../actions/actions'

import CartItem from '../components/CartItem'
import Button from '../components/Button'


class CartPage extends Component {

    constructor() {
        super()
        this.renderItems = this.renderItems.bind(this)
    }

    componentWillMount() {
        const Moltin = MoltinGateway({
            client_id: 'RuIG6TZULXPmfzhIfwgJg1Evg8iKvgchkv68gIoQsu'
        })
        Moltin.Cart.Items().then((cart) => {
            this.props.dispatch(updateCart(cart))
        })
    }

    renderItems() {
        return this.props.cart.data.map(item => <CartItem key={ item.id } cart={ this.props.cart } item={ item } />)
    }

    render() {
        let cart = this.props.cart

        if (!cart.data || cart.data.length === 0) {
            return (
                <div className="cart">
                    <span className="empty-cart">Your cart is empty!</span>
                </div>
            )
        }
        else {
            return (
                <div className="cart">
                    <span>Total price: <strong>{ cart.meta.display_price.with_tax.formatted }</strong></span>
                    <Link to="/checkout"><Button label="Order now" /></Link>
                    <div className="items">
                        { this.renderItems() }
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart
    }
}

export default connect(mapStateToProps)(CartPage)
