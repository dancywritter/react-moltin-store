import React, { Component } from 'react'

import Cart from './Cart'
import logo from '../logo.svg'

class Header extends Component {

    constructor() {
        super()
        this.logout = this.logout.bind(this)
        this.state = {
            user: null
        }
    }

    logout() {
        localStorage.removeItem('user')
    }

    render() {
        if (!localStorage.getItem('user')) {
            return(
                <header className="header">
                    <div className="header-logo"><img src={logo} alt="react moltin store" /></div>
                    <div className="header-cart">
                        <Cart />
                    </div>
                </header>
            );
        }
        else {
            return(
                <header className="header">
                    <div className="header-logo"><img src={logo} alt="react moltin store" /></div>
                    <div className="header-cart">
                        <Cart />
                    </div>
                </header>
            );
        }
    }
}

export default Header;
