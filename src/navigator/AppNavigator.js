import {
    createAppContainer,
    createSwitchNavigator,
} from "react-navigation";

import { createStackNavigator } from 'react-navigation-stack'
import chartScreenContainer from '../module/chartScreen/container/chartScreenContainer'
import SplashContainer from '../module/splash/SplashContainer'
import FilterContainer from '../module/filterScreen/containers/FilterContainer'
import FeedbackQuestionContainer from '../module/feedbackScreen/containers/FeedbackQuestionContainer'
import FeedbackChartContainer from "../module/feedbackScreen/containers/FeedbackChartContainer";
import LanguageListComponent from "../module/languageScreen/LanguageList";


const DashBoardNavigation = createStackNavigator(
    {
        filterScreen: {
            screen: FilterContainer
        },
        languageScreen: {
            screen: LanguageListComponent
        },
        chartScreen: {
            screen: chartScreenContainer
        },
        feedbackQuestions: {
            screen: FeedbackQuestionContainer
        },
        feedbackChart: {
            screen: FeedbackChartContainer
        }

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
