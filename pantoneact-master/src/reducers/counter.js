import * as types from "../config/action-types/count";

const initialState =  {
  value: 0
}



export default function counterAction(state = initialState,
  action = {}) {
  switch (action.type) {
    case types.INCREASE:
      return {
        ...state,
        value : state.value + 1
      }
    case types.DECREASE:
      return {
        ...state,
        value: state.value - 1
      }
    default:
      return state;
  }
}
