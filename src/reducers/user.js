import { UPDATE_USER } from '../actions/action-types'

const user = (state = {}, action) => {
  switch (action.type) {
      case UPDATE_USER:
          return {
              ...state.user,
              ...action.user
          }
      default:
          return state
  }
}

export default user
