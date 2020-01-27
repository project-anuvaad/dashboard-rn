/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { SafeAreaView,  StatusBar } from 'react-native';

import AppNavigator from './src/navigator/AppNavigator'
import { Provider } from 'react-redux';
import { storeFactory } from './src/flux/store/store';

const App = () => {
  return (
    <Provider store={storeFactory}>
        <SafeAreaView style={{ flex:1, backgroundColor: '#409DD6'}}>
          <StatusBar barStyle="light-content" backgroundColor= '#409DD6' />
          <AppNavigator />
        </SafeAreaView>
      </Provider>
  );
};

export default App;
