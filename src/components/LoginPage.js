import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import firebase from '../server/base'
import { updateUser } from '../actions/actions'

import Button from './Button'

class LoginPage extends Component {

    constructor() {
        super()
        this.state = {
            error: null
        }
    }

    authenticate(email, password) {
        const that = this
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function(user) {
                localStorage.setItem('muser', user.uid)
                that.props.dispatch(updateUser(user))
            })
            .catch(function(error) {
                const errorMessage = error.message;
                that.setState({ error: errorMessage })
                console.warn(error)
            })
    }

    signup(email, password) {
        const that = this
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function(user) {
                that.props.dispatch(updateUser(user))
            })
            .catch(function(error) {
                const errorMessage = error.message
                that.setState({ error: errorMessage })
                console.warn(error)
            });
    }

    render() {
        return (
            <div className="login-form">
                <div className="field-line">
                    <input className="field-input"
                        ref={ (input) => this.email = input }
                        placeholder="Email"
                        type="text"
                    />
                </div>

                <div className="field-line">
                    <input className="field-input"
                        ref={ (input) => this.password = input }
                        type="password"
                        placeholder="Password"
                    />
                </div>
                <Button onClick={ () => this.authenticate(this.email.value, this.password.value) } label="Sign in"/>
                <span className="reset-password-title">Forgot password? <Link to={ '/reset-password' }>Click here</Link> to reset.</span>
                <div className="signup">
                    <Button className="signup-btn" onClick={ () => this.signup(this.email.value, this.password.value) } label="Sign up"/>
                </div>
            </div>
        )
    }
}

export default connect()(LoginPage)
