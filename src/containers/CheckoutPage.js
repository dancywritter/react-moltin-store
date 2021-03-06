import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import firebase from '../server/base'
import { updateUser, updateOrder, updateAddress } from '../actions/actions'

import LoginPage from '../components/LoginPage'
import OrderPage from '../components/OrderPage'
import CheckoutForm from '../components/CheckoutForm'

class CheckoutPage extends Component {

  state = {
    error: null
  }

  getFirebaseUserPromise() {
    return new Promise((resolve, reject) => {
      const getUser = () => {
        const user = firebase.auth().currentUser
        if (user) {
          resolve(user)
        } else {
          setTimeout(() => getUser(), 500)
        }
      }
      getUser();
    });
  }

  componentDidMount() {
      this.getFirebaseUserPromise()
        .then(user => {
          this.props.dispatch(updateUser(user))
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
    if (!this.props.user || nextProps.user.uid !== this.props.user.uid) {
      firebase.database().ref('users/' + nextProps.user.uid).on("value", snapshot => {
        if (snapshot.val() != null) {
          this.props.dispatch(updateAddress(snapshot.val().address))
        }
      })
    }
  }

  render() {
    const { user, cart, order, address } = this.props

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
            <OrderPage cart={ cart } order={ order } />
          </div>
        )
    }
    else {
      if (!Object.keys(address).length) return null
      return (
        <div className="checkout">
          <span className="checkout-title">Welcome! You can now proceed your order</span>
          <CheckoutForm user={ user } address={ address } />
        </div>
      )
    }
  }
}

const mstp = (state) => {
  const { user, cart, order, address } = state;
  return {
    user,
    cart,
    order,
    address
  }
}

const mdtp = dispatch => bindActionCreators({ updateUser, updateOrder, updateAddress }, dispatch);

export default connect(mstp, mdtp)(CheckoutPage)
