import { UPDATE_CART } from './action-types';

export const updateCart = (cart) => {
    return {
        type: UPDATE_CART,
        cart : cart
    }
}
