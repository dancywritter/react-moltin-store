import { combineReducers } from 'redux'
import cart from './cart'
import user from './user'
import order from './order'
import address from './address'

const reducers = combineReducers({
    cart,
    user,
    order,
    address
})

export default reducers
