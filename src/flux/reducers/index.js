import apiStatus from './apiStatus/apiStatus';
import getChartDataCount from './getChartDataCountReduer'
import getChartData from './getChartDataReducer'
import getFeedbackData from './getFeedbackDataReducer'
import getFeedbackDataCount from './getFeedbackDataCountReducer'

export default {
    apiStatus: apiStatus,
    getChartDataCount: getChartDataCount,
    getChartData: getChartData,
    getFeedbackDataCount: getFeedbackDataCount,
    getFeedbackData: getFeedbackData
}