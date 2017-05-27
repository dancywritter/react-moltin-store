import { UPDATE_ORDER } from '../actions/action-types'

const order = (state = {}, action) => {
  switch (action.type) {
      case UPDATE_ORDER:
          return {
              ...state.order,
              ...action.order
          }
      default:
          return state
  }
}

export default order
