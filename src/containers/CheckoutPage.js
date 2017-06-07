import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from '../server/base'
import { updateUser, updateOrder, updateAddress } from '../actions/actions'

import LoginPage from '../components/LoginPage'
import OrderPage from '../components/OrderPage'
import CheckoutForm from '../components/CheckoutForm'

class CheckoutPage extends Component {

    constructor() {
        super()
        this.state = {
            error: null
        }
    }

    componentDidMount() {
        const that = this
        firebase.database().ref('users/' + this.props.user.uid).on("value", function(snapshot) {
            that.props.dispatch(updateUser(firebase.auth().currentUser))
            if (snapshot.val() !== null) {
                that.props.dispatch(updateAddress(snapshot.val().user.address))
            }
        })

        const order_id = localStorage.getItem('morder')
        if (order_id) {
            fetch('http://localhost:4000/api/order/' + order_id)
            .then(res => res.json())
            .then(order => {
                this.props.dispatch(updateOrder(order))
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
    }

    render() {
        let user = this.props.user
        let cart = this.props.cart
        let order = this.props.order
        let address = this.props.address

        if (!user.uid) {
            return (
                <div className="login">
                    <span className="login-title">Before checking out, please log in</span>
                    <LoginPage />
                </div>
            )
        }
        else if (order.id) {
            return (
              <div className="order">
                  <span className="order-title">Here is your order recap, time to select you shipping options</span>
                  <OrderPage cart={ cart } order={ order } />
              </div>
            )
        }
        else {
            return (
                <div className="checkout">
                    <span className="checkout-title">Welcome! You can now proceed your order</span>
                    <CheckoutForm user={ user } address={ address } />
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        cart: state.cart,
        order: state.order,
        address: state.address
    }
}

export default connect(mapStateToProps)(CheckoutPage)
