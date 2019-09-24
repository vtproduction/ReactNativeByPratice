import React from 'react';
import { StyleSheet, View } from 'react-native';

import TimerButton from './TimerButton';
import TimerForm from './TimerForm';

export default class ToggleableTimerForm extends React.Component {
  state = {
    isOpen: false,
  };

  handleFormOpen = () => {
    this.setState({ isOpen: true });
  };

  render() {
    const { isOpen } = this.state;

    return (
      <View style={[styles.container, !isOpen && styles.buttonPadding]}>
        {isOpen ? (
          <TimerForm />
        ) : (
          <TimerButton title="Add new +" color="black" onPress={this.handleFormOpen} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    
    margin: 15,
  },
  buttonContainer: {
    paddingHorizontal: 15,
  },
});
