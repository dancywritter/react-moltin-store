import { combineReducers } from 'redux'
import cart from './cart'
import user from './user'
import order from './order'

const reducers = combineReducers({
    cart,
    user,
    order
})

export default reducers
