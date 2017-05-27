import { UPDATE_CART, UPDATE_ORDER, UPDATE_USER } from './action-types'

export const updateCart = (cart) => {
    return {
        type: UPDATE_CART,
        cart : cart
    }
}

export const updateOrder = (order) => {
    return {
        type: UPDATE_ORDER,
        order : order
    }
}

export const updateUser = (user) => {
    return {
        type: UPDATE_USER,
        user : user
    }
}
