import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './app.css'
import reducers from './reducers/reducers'
import HomePage from './components/HomePage'
import CartPage from './components/CartPage'
import CheckoutPage from './components/CheckoutPage'
import ResetPassword from './components/ResetPassword'
import Header from './components/Header'

let store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={ HomePage } />
                    <Route path="/cart" component={ CartPage } />
                    <Route path="/checkout" component={ CheckoutPage } />
                    <Route path="/reset-password" component={ ResetPassword } />
                </Switch>
                <Header />
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
)
