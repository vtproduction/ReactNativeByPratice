import React, { Component } from 'react'
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { AnimatedBar } from "../components/animatedBar";

const DELAY = 100

export class Dummy extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       data: []
    };
  };

  componentDidMount() {
    this.generateData()
  }
  
  

  generateData = () => {
    const data = []
    for(let i = 0; i < 10; i++){
      data.push(Math.floor(Math.random() * 100))
    }

    this.setState({
      data
    })
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#33495D', justifyContent: 'center' }}>
        <View style={{flexDirection: 'row', flex: 1, justifyContent: 'center',transform: [{rotate: '180deg'}]}}>
          <AnimatedBar/>
        </View>
      </View>
    )
  }
}





export default Dummy

