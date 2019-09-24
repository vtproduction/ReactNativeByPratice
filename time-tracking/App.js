import React from 'react';
import uuidv4 from 'uuid/v4';

import { StyleSheet, View, ScrollView, Text } from 'react-native';

import EditableTimer from './components/EditableTimer';
import ToggleableTimerForm from './components/ToggleableTimerForm';

export default class App extends React.Component {
  state = {
    timers: [
      {
        title: 'Mow the lawn',
        project: 'House Chores',
        id: uuidv4(),
        elapsed: 5456099,
        isRunning: true,
      },
      {
        title: 'Bake squash',
        project: 'Kitchen Chores',
        id: uuidv4(),
        elapsed: 1273998,
        isRunning: false,
      }/* ,
      {
        title: 'Lorem ipsum',
        project: 'Donor sit amet',
        id: uuidv4(),
        elapsed: 1273221,
        isRunning: true
      } */
    ],
  };

  render() {
    const { timers } = this.state;

    return (
      <View style={styles.appContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Timers</Text>
        </View>
        <ScrollView style={styles.timerList}>
          <ToggleableTimerForm />
          {timers.map(item => (
            <EditableTimer
              key={item.id}
              id={item.id}
              title={item.title}
              project={item.project}
              elapsed={item.elapsed}
              isRunning={item.isRunning}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  titleContainer: {
    paddingTop: 35,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#D6D7DA',
  },
  title: {
      marginTop: 18,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  timerList: {
    paddingBottom: 45,
  },
});
