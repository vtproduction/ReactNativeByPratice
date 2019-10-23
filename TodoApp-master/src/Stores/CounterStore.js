import { observable, computed } from 'mobx';
import { AsyncStorage } from 'react-native';
import store from 'react-native-simple-store';

export default class CounterStore {
  @observable value

  constructor() {
    this.value = new Model
  }

  @computed
  get getSum() {
    return this.value.data + this.value.data2
  }

  increase = () => {
    this.value.data++
    return
  }

  decrease = () => {
    this.value.data--
    return
  }
  
}

class Model {
  @observable data = 0
  @observable data2 = 0.1
}