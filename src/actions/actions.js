import { UPDATE_CART, UPDATE_ORDER, UPDATE_USER, UPDATE_ADDRESS } from './action-types'

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

export const updateAddress = (address) => {
    return {
        type: UPDATE_ADDRESS,
        address : address
    }
}
