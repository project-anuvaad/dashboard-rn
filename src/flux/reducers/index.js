import apiStatus from './apiStatus/apiStatus';
import getChartDataCount from './getChartDataCountReduer'
import getChartData from './getChartDataReducer'
import getFeedbackData from './getFeedbackDataReducer'

export default {
    apiStatus: apiStatus,
    getChartDataCount: getChartDataCount,
    getChartData: getChartData,
    getFeedbackData: getFeedbackData
}