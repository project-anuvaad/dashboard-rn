import {
    createAppContainer,
    createSwitchNavigator,
} from "react-navigation";

import { createStackNavigator } from 'react-navigation-stack'
import chartScreenContainer from '../module/chartScreen/container/chartScreenContainer'
import SplashContainer from '../module/splash/SplashContainer'
import FilterContainer from '../module/filterScreen/containers/FilterContainer'


const DashBoardNavigation = createStackNavigator(
    {
        filterScreen: {
            screen: FilterContainer
        },
        chartScreen: {
            screen: chartScreenContainer
        },

    }, {
        initialRouteName: 'filterScreen',
        headerMode: 'none'
    }
)
const AppNavigation = createSwitchNavigator(
    {   
        splash: {
            screen: SplashContainer
        },
        dashboardMain: DashBoardNavigation 
    },
    {
        initialRouteName: 'splash',
    }
);

export default (AppContainer = createAppContainer(AppNavigation));
