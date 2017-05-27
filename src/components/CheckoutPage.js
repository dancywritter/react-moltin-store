import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from '../server/base'
import { gateway as MoltinGateway } from '@moltin/sdk'
import { updateUser, updateOrder } from '../actions/actions'

import LoginPage from './LoginPage'
import OrderPage from './OrderPage'
import CheckoutForm from './CheckoutForm'

class CheckoutPage extends Component {

    constructor() {
        super()
        this.state = {
            error: null
         }
    }

    componentWillMount() {
        const user = firebase.auth().currentUser
        this.props.dispatch(updateUser(user))

        const order_id = localStorage.getItem('morder')
        if (order_id) {
            const Moltin = MoltinGateway({
                client_id: 'RuIG6TZULXPmfzhIfwgJg1Evg8iKvgchkv68gIoQsu'
            })
            Moltin.Orders.All().then((order) => {
                console.log(order)
                //this.props.dispatch(updateOrder(order))
            })
        }
    }

    render() {
        let user = this.props.user
        let order = this.props.order

        if (!user.uid) {
            return (
                <div className="login">
                    <span className="login-title">Before checking out, please log in</span>
                    <LoginPage />
                </div>
            )
        }
        else if (order.data) {
            return (
              <div className="order">
                  <span className="order-title">Here is your order recap, time to select you shipping options</span>
                  <OrderPage order={ order } />
              </div>
            )
        }
        else {
            return (
                <div className="checkout">
                    <span className="checkout-title">Welcome! You can now proceed your order</span>
                    <CheckoutForm user={ user } />
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        order: state.order
    }
}

export default connect(mapStateToProps)(CheckoutPage)
