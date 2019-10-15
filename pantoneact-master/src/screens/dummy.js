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
      <View style={styles.container}>
        <View style={styles.view}>
          {
            this.state.data.map((value, index) => 
              <AnimatedBar value={value} delay={DELAY * index} key={index}/>
            )
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#33495D',
    justifyContent: 'center'
  },

  view: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    transform: [{
      rotate: '180deg'
    }]
  }
})



export default Dummy

