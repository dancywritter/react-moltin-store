import React, { Component } from 'react'
import firebase from '../server/base'

import Button from './Button'

class ResetPassword extends Component {

    constructor() {
        super();
        this.state = { error: null };
    }

    reset(email, context) {
        const that = this
        firebase.auth().sendPasswordResetEmail(email)
            .then(function() {
                context.router.push({
                  pathname: '/checkout'
                })
            })
            .catch(function(error) {
                const errorMessage = error.message;
                that.setState({ error: errorMessage })
            })
    }

    render() {
        return (
            <div className="reset-password">
                <span>Reset your password</span>
                <div className="field-line">
                    <input className="field-input"
                        ref={ (input) => this.email = input }
                        placeholder="Email"
                        type="text"
                    />
                </div>
                <Button className="btn form-btn" onClick={ () => this.reset(this.email.value, this.context, this.state) } label="Reset password" />
            </div>
        )
    }

}

export default ResetPassword
