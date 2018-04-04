import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { gateway as MoltinGateway } from '@moltin/sdk'
import { updateCart } from '../actions/actions'

import Cart from './Cart'

class Header extends Component {

  constructor() {
    super()
    this.logout = this.logout.bind(this)
    this.state = {
      user: null
    }
  }

  componentWillMount() {
    const Moltin = MoltinGateway({
      client_id: 'RuIG6TZULXPmfzhIfwgJg1Evg8iKvgchkv68gIoQsu'
    })
    Moltin.Cart.Items().then((cart) => {
      this.props.dispatch(updateCart(cart))
    })
  }

  logout() {
    localStorage.removeItem('user')
  }

  render() {
    const cart = this.props.cart

    return(
      <header className="header">
        <Link to="/">
          <div className="header-home">
            <span>Home</span>
          </div>
        </Link>
        <div className="header-cart">
          <Cart cart={ cart } />
        </div>
      </header>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart
  }
}

export default connect(mapStateToProps)(Header)
