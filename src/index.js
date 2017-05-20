import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './index.css';
import reducers from './reducers/reducers'
import App from './components/App'

let store = createStore(reducers)

  ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path="/" component={ App } />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
);
