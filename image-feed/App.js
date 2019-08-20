import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import Constants from 'expo-constants';
import Feed from './screens/Feed';





export default function App() {
  return (
    <View style={styles.container}>
      <Feed style={styles.feed}/>
    </View>
    
  );
}


const platformVersion = Platform.OS === 'ios'
  ? parseInt(Platform.Version, 10)
  : Platform.Version;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  feed: {
    flex: 1,
    marginTop:
      Platform.OS === 'android' || platformVersion < 11
        ? Constants.statusBarHeight
        : 0,
  },
});
