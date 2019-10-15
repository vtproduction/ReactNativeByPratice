import React, { Component } from 'react'
import { Animated, View, Text, StyleSheet } from "react-native";

export default class AnimatedBar extends Component {
  constructor(props) {
    super(props)
    this._height = new Animated.Value(0)
  }

  componentDidMount() {
    const {value} = this.props
    Animated.timing(this._height,{
      toValue: value
    }).start()
  }
  

  render() {
    const barStyles = {
      backgroundColor: '#1ABC9C',
      height: this._height,
      borderTopRightRadius: 3,
      borderTopLeftRadius: 3,
      width: 20,
      margin: 4
    };
    const emptyStyle = {
      backgroundColor: 'white',
      width: 20,
      height: 150,
      margin: 4,
      position: 'absolute',
      top: 35,
      borderBottomRightRadius: 3,
      borderBottomLeftRadius: 3,
      borderTopRightRadius: 3,
      borderTopLeftRadius: 3,
    };

    const textStyle = {
      color: 'white',
      fontSize: 11,
      transform: [{
        rotate: '180deg'
      }],
      textAlign: 'center',
      marginTop: 20
    }
    return (
      <View>
        <Text style={textStyle}>{this.props.value}</Text>
        <View style={emptyStyle}></View>
        <Animated.View style={barStyles} />
      </View>
    )
  }
}




