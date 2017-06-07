import { UPDATE_ADDRESS } from '../actions/action-types'

const address = (state = {}, action) => {
  switch (action.type) {
      case UPDATE_ADDRESS:
          return {
              ...state.address,
              ...action.address
          }
      default:
          return state
  }
}

export default address
