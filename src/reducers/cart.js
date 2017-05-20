import { UPDATE_CART } from '../actions/action-types';

const cart = (state = {}, action) => {
  switch (action.type) {
      case UPDATE_CART:
          return {
              ...state.cart,
              ...action.cart
          }
      default:
          return state
  }
}

export default cart
