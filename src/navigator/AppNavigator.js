import {
    createAppContainer,
    createSwitchNavigator,
} from "react-navigation";

import { createStackNavigator } from 'react-navigation-stack'
import chartScreenContainer from '../module/chartScreen/container/chartScreenContainer'

const AppNavigation = createSwitchNavigator(
    {
        chartScreen: {
            screen: chartScreenContainer
        },
    },
    {
        initialRouteName: 'chartScreen',
    }
);

export default (AppContainer = createAppContainer(AppNavigation));
