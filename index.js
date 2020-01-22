/**
 * @format
 */
/* eslint react/prop-types: 0 */
/* eslint-disable */


import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler'

console.disableYellowBox = true; 

AppRegistry.registerComponent(appName, () => App);
