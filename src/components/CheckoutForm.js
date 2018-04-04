import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from '../server/base'
import { gateway as MoltinGateway } from '@moltin/sdk'
import { updateOrder, updateAddress } from '../actions/actions'

import Button from './Button'

class CheckoutForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      error: null,
      address: this.props.address
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ address: nextProps.address })
  }

  saveInfos({ first_name, last_name, company_name, line_1, line_2, postcode, country }) {
    const user = {
        customer: {
            name: first_name + " " + last_name,
            email: this.props.user.email
        },
        address: {
            first_name: first_name,
            last_name: last_name,
            company_name: company_name,
            line_1: line_1,
            line_2: line_2,
            postcode: postcode,
            county: country,
            country: country
        },
        orders: []
    }

    firebase.database().ref('users/' + this.props.user.uid).on("value", snapshot => {
        if (typeof snapshot.val().orders !== "undefined") {
            user.orders = snapshot.val().orders
            console.log(user.orders)
        }
    })

    firebase.database().ref('users/' + this.props.user.uid).set({
        customer: user.customer,
        address: user.address
    }).then(() => {
        const body = {
            customer: user.customer,
            billing_address: user.address,
            shipping_address: user.address
        }
        const Moltin = MoltinGateway({
            client_id: 'RuIG6TZULXPmfzhIfwgJg1Evg8iKvgchkv68gIoQsu'
        })
        Moltin.Cart.Checkout(body).then((order) => {
            user.orders.push(order)
            firebase.database().ref('users/' + this.props.user.uid).update({
                orders: user.orders
            }).then(() => {
                this.props.dispatch(updateOrder(order))
                this.props.dispatch(updateAddress(user.address))
                localStorage.setItem('morder', order.data.id)
            })
        })
    })
  }

  handleInputChange(input, e) {
    this.setState({
      address: {
          ...this.state.address,
          [input] : e.target.value
      }
    })
  }

  render() {
    return (
      <form className="checkout-form" onClick={ () => this.saveInfos(this.state.address)}>
        <div className="field-line">
          <input className="field-input"
              placeholder="First name"
              type="text"
              value={ this.state.address.first_name }
              onChange={ this.handleInputChange.bind(this, 'first_name') }
          />
          <input className="field-input"
              placeholder="Last name"
              type="text"
              value={ this.state.address.last_name }
              onChange={ this.handleInputChange.bind(this, 'last_name') }
          />
        </div>

        <div className="field-line">
          <input className="field-input"
              placeholder="Company"
              type="text"
              value={ this.state.address.company }
              onChange={ this.handleInputChange.bind(this, 'company') }
          />
        </div>

        <div className="field-line">
          <input className="field-input"
              placeholder="Address 1"
              type="text"
              value={ this.state.address.line_1 }
              onChange={ this.handleInputChange.bind(this, 'line_1') }
          />
        </div>

        <div className="field-line">
          <input className="field-input"
              placeholder="Address 2"
              type="text"
              value={ this.state.address.line_2 }
              onChange={ this.handleInputChange.bind(this, 'line_2') }
          />
        </div>

        <div className="field-line">
          <input className="field-input"
              placeholder="Zipcode"
              type="number"
              value={ this.state.address.postcode }
              onChange={ this.handleInputChange.bind(this, 'postcode') }
          />
          <input className="field-input"
              placeholder="Country"
              type="text"
              value={ this.state.address.country }
              onChange={ this.handleInputChange.bind(this, 'country') }
          />
        </div>

        <div className="confirm-order">
          <Button type="submit" label="Confirm order" />
        </div>
      </form>
    )
  }
}

export default connect()(CheckoutForm)
