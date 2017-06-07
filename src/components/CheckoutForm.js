import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from '../server/base'
import { gateway as MoltinGateway } from '@moltin/sdk'
import { updateOrder, updateAddress } from '../actions/actions'

import Button from './Button'

class CheckoutForm extends Component {

    constructor() {
        super()
        this.state = {
            error: null,
            address: null
        }
    }

    componentWillMount() {
        this.setState({ address: this.props.address })
    }

    saveInfos(first_name, last_name, company, address_1, address_2, zipcode, country) {
        const that = this
        const user = {
            customer: {
                name: first_name + " " + last_name,
                email: this.props.user.email
            },
            address: {
                first_name: first_name,
                last_name: last_name,
                company_name: company,
                line_1: address_1,
                line_2: address_2,
                postcode: zipcode,
                county: country,
                country: country
            },
            orders: []
        }
        firebase.database().ref('users/' + this.props.user.uid).set({
            user
        }).then(function () {
            const body = {
                customer: user.customer,
                billing_address: user.address,
                shipping_address: user.address
            }
            const Moltin = MoltinGateway({
                client_id: 'RuIG6TZULXPmfzhIfwgJg1Evg8iKvgchkv68gIoQsu'
            })
            Moltin.Cart.Checkout(body).then((order) => {
                user['orders'].push(order)
                firebase.database().ref('users/' + that.props.user.uid).update({
                    user
                }).then(function () {
                    that.props.dispatch(updateOrder(order))
                    that.props.dispatch(updateAddress(user.address))
                    localStorage.setItem('morder', order.data.id)
                })
            })
        })
    }

    render() {

        return (
            <div className="checkout-form">
                <div className="field-line">
                    <input className="field-input"
                        ref={ (input) => this.first_name = input }
                        placeholder="First name"
                        type="text"
                        value={ this.state.address.first_name }
                    />
                    <input className="field-input"
                        ref={ (input) => this.last_name = input }
                        placeholder="Last name"
                        type="text"
                        value={ this.state.address.last_name }
                    />
                </div>

                <div className="field-line">
                    <input className="field-input"
                        ref={ (input) => this.company = input }
                        placeholder="Company"
                        type="text"
                    />
                </div>

                <div className="field-line">
                    <input className="field-input"
                        ref={ (input) => this.address_1 = input }
                        placeholder="Address 1"
                        type="text"
                        value={ this.state.address.line_1 }
                    />
                </div>

                <div className="field-line">
                    <input className="field-input"
                        ref={ (input) => this.address_2 = input }
                        placeholder="Address 2"
                        type="text"
                    />
                </div>

                <div className="field-line">
                    <input className="field-input"
                        ref={ (input) => this.zipcode = input }
                        placeholder="Zipcode"
                        type="number"
                        value={ this.state.address.postcode }
                    />
                    <input className="field-input"
                        ref={ (input) => this.country = input }
                        placeholder="Country"
                        type="text"
                        value={ this.state.address.country }
                    />
                </div>

                <div className="confirm-order">
                    <Button onClick={ () => this.saveInfos(
                        this.first_name.value,
                        this.last_name.value,
                        this.company.value,
                        this.address_1.value,
                        this.address_2.value,
                        this.zipcode.value,
                        this.country.value
                    ) } label="Confirm order"/>
                </div>
            </div>
        )
    }
}

export default connect()(CheckoutForm)
