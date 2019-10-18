import * as types from "../config/action-types/count"
import { AsyncStorage } from "react-native"

export function increaseNum() {
  return async dispatch => {
    AsyncStorage.getItem('savedStore')
      .then((x) => {
        console.log("increaseNum >>> ", x);
        const currentVal = JSON.parse(x)
        const value = currentVal.counterAction.value
        const newVal = {
          ...currentVal,
          counterAction: { 
            value: value + 1
          }
        }
        AsyncStorage.setItem('savedStore', JSON.stringify(newVal))
        dispatch(increaseNumRequest())
      })
      .catch((error) =>{
        console.log("increaseNum error >>> ", error);
      })
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