/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
} from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import AppNavigator from './src/navigator/AppNavigator'
import { Provider } from 'react-redux';
import { storeFactory } from './src/flux/store/store';

const App = () => {
  return (
    <>
      <Provider store={storeFactory}>
        <PaperProvider>
          <StatusBar barStyle="light-content" backgroundColor="#1976D2" />
          {/* <SafeAreaView > */}
          <View style={{ flex: 1, backgroundColor: '#ffff' }}>
            <AppNavigator />
          </View>
          {/* </SafeAreaView> */}
        </PaperProvider>
      </Provider>
    </>
  );
};

export default App;
