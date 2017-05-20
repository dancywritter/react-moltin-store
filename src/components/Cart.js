import React, { Component } from 'react'
import { connect } from 'react-redux'
import { gateway as MoltinGateway } from 'moltin'

class Cart extends Component {

    constructor() {
        super()
        this.state = {
            cart: {}
        }
    }

    componentWillMount() {
        const Moltin = MoltinGateway({
            client_id: 'RuIG6TZULXPmfzhIfwgJg1Evg8iKvgchkv68gIoQsu'
        })
        Moltin.Cart.Items().then((cart) => {
            this.setState({ cart: cart })
        })
    }

    render() {

        let cart = this.state.cart
        if (this.props.cart.data) {
            cart = this.props.cart
        }

        if (!cart.data) {
            return(
                <div className="cart">
                      <span>Cart</span>
                      <div className="cart-count">0</div>
                </div>
            )
        }
        else {
            return(
                <div className="cart">
                    <span>Cart</span>
                    <div className="cart-count">{ cart.data.length }</div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart
    };
};

export default connect(mapStateToProps)(Cart);
