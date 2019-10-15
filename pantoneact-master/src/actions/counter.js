import * as types from "../config/action-types/count"

export function increaseNum() {
  return dispatch => {
    dispatch(increaseNumRequest())
  }
}


export function decreaseNum() {
  return dispatch => {
    dispatch(decreaseNumRequest())
  }
}


function increaseNumRequest() {
  return {
    type: types.INCREASE
  }
}

function decreaseNumRequest() {
  return {
    type: types.DECREASE
  }
}