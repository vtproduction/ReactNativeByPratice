import React, { Component } from "react";
import { AsyncStorage, AppState } from "react-native";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import * as reducers from "./reducers";

import AppContainer from "./config/router";

import { LOGOUT_SUCCESS } from "./config/action-types/authenticate";


const middleware = applyMiddleware(thunk, logger)
const reducer = combineReducers(reducers)
const rootReducer = (state, action) => {
  if (action.type === LOGOUT_SUCCESS) { // If the user have successfully signed out and ended his/her session
    state = undefined // Reset all state to remove cached data of the previous session
  }
  return reducer(state, action)
}

let store = createStore(rootReducer, middleware)

class App extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      store: store
    };
  };
  

  componentWillMount() {
    
    var self = this
    AppState.addEventListener('change', this._handleAppStateChange.bind(this))
    AsyncStorage.getItem('savedStore').then((value) => {
      if (value) {
        let storeValue = JSON.parse(value)
        console.log(storeValue);
        
        self.setState({
          store: createStore(rootReducer, storeValue, middleware)
        })
      }else{
        self.setState({store})
      }
    }).catch((error) => {
      self.setState({ store })
    })
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange.bind(this));
  }

  _handleAppStateChange(currentAppState) {
    let storingValue = JSON.stringify(this.state.store.getState())
    console.log("_handleAppStateChange: ", storingValue);
    
    AsyncStorage.setItem('savedStore', storingValue);
  }
  

  render() {
    return (
      <Provider store={this.state.store}>
        <AppContainer />
      </Provider>
    );
  }
}

export default App;
