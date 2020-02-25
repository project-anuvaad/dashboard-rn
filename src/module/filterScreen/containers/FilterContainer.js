import React, { Component } from 'react'
import { View, Alert } from 'react-native'
import Spinner from '../../common/components/loadingIndicator';
import FilterComponent from '../components/FilterComponent'
import HeaderComponent from '../../common/components/HeaderComponent'
import APITransport from '../../../flux/actions/transport/apiTransport'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GetChartDataCountAction } from '../../../flux/actions/apis/getChartDataCountAction'
import { GetChartDataAction } from '../../../flux/actions/apis/getChartDataAction'
import { GetFeedbacktDataCountAction } from '../../../flux/actions/apis/getFeedbackDataCountAction'
import { GetFeedbackDataAction } from '../../../flux/actions/apis/getFeedbackDataAction'
import _ from 'lodash'
import Strings from '../../../utils/Strings'
// import Content from '../../../data'

const stackLabels = [Strings.yes, Strings.no];
const stackLanguageLabels = [Strings.bengali_language, Strings.english_language, Strings.gujrati_language, Strings.hindi_language, Strings.malayalam_language, Strings.marathi_language, Strings.tamil_language, Strings.telugu_language, Strings.kannada_language, Strings.punjabi_language]

class FilterContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            dateQuery: {}
        }
    }

    componentDidMount() {
        // let apiObj = new GetChartDataCountAction();
        // this.setState({
        //     isLoading: true
        // }, () => {
        //     this.props.APITransport(apiObj);
        // })
        // let data = Content.hits
        // let sourceArray = data.hits
    }

    componentDidUpdate(prevProps) {
        if (prevProps != this.props) {
            const { getChartDataCount, getChartData, getFeedbackDataCount, getFeedbackData, apiStatus, navigation } = this.props
            const { range, startDate, endDate, dateQuery } = this.state
            if (getChartDataCount && prevProps.getChartDataCount != getChartDataCount && !apiStatus.error) {
                if (getChartDataCount.hits.total.value !== 0) {
                    let apiObj = new GetChartDataAction(getChartDataCount.hits.total.value, dateQuery);
                    this.props.APITransport(apiObj);
                }
                else {
                    this.setState({
                        isLoading: false
                    }, () => {
                        Alert.alert(Strings.message, Strings.no_data)
                    })
                }
            }
            if (getChartData && prevProps.getChartData != getChartData && !apiStatus.error) {
                this.setState({ isLoading: false }, () => {
                    this.props.navigation.navigate('chartScreen', { selectedRange: range, startDate, endDate, data: getChartData })
                })
            }
            if (getFeedbackDataCount && prevProps.getFeedbackDataCount != getFeedbackDataCount && !apiStatus.error) {
                if (getFeedbackDataCount.hits.total.value !== 0) {
                    let apiObj = new GetFeedbackDataAction(getFeedbackDataCount.hits.total.value, dateQuery);
                    this.props.APITransport(apiObj);
                }
                else {
                    this.setState({
                        isLoading: false
                    }, () => {
                        Alert.alert(Strings.message, Strings.no_data)
                    })
                }
            }
            if (getFeedbackData && prevProps.getFeedbackData != getFeedbackData && !apiStatus.error) {
                this.setState({
                    isLoading: false
                }, () => {
                    let position_arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                    let lang_arr = ['', '', '', '', '', '', '', '', '', '']
                    let questionsArr = []
                    let questions = []
                    getFeedbackData.hits.hits.forEach(items => {
                        questionsArr.push(items._source)
                    });
                    let groupByQuestions = _.groupBy(questionsArr, "question")

                    let chartData = []
                    let pieData = []
                    _.forOwn(groupByQuestions, function (value, key) {
                        let addToList = false
                        chartData = []
                        pieData = []
                        let questionsObj = {}
                        let obj = {}
                        let xValueFormatter = []
                        value.map((v) => {
                            if (!v.answer) {
                                v.answer = 0
                            }
                        })
                        let groupByLang = _.groupBy(value, "target_lang")
                        let groupByAnswer = _.groupBy(value, "answer")
                        _.forOwn(groupByLang, function (value, lang_key) {
                            chartData = []
                            let xValueFormatter = []
                            let groupByAnswer = _.groupBy(value, "answer")
                            _.forOwn(groupByAnswer, function (value, key) {
                                obj = {}
                                if (!isNaN(key)) {
                                    obj = {
                                        'key': key,
                                        'value': value,
                                        'y': value.length
                                    }
                                    chartData.push(obj)
                                    xValueFormatter.push(key.toUpperCase() + Strings.rating);
                                }
                            })
                            questionsObj = {
                                'key': key,
                                'label': Strings.no_of_ratings+lang_key,
                                'type': 'chart',
                                'xValue': xValueFormatter,
                                'chartData': chartData
                            }
                            questions.push(questionsObj)

                        })
                        chartData = []
                        _.forOwn(groupByAnswer, function (value, key) {
                            obj = {}
                            if (!isNaN(key)) {
                                let lang_obj = {}
                                position_arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                                lang_arr = ['', '', '', '', '', '', '', '', '', '']
                                _.forEach(value, function (v2, k2) {
                                    if (lang_obj[v2.target_lang]) {
                                        lang_obj[v2.target_lang] += 1
                                    } else {
                                        lang_obj[v2.target_lang] = 1
                                    }
                                })
                                _.forOwn(lang_obj, function (value, key) {
                                    let a = stackLanguageLabels.indexOf(key)
                                    position_arr[a] = value
                                    lang_arr[a] = key
                                })
                                let lang_ans_obj = {
                                    'y': position_arr,
                                    // 'marker': langArr
                                }
                                // getLanguagesByCourt.push(lang_ans_obj)
                                addToList = true
                                // obj = {
                                //     'key': key,
                                //     'value': value,
                                //     'y': value.length
                                // }
                                chartData.push(lang_ans_obj)
                                xValueFormatter.push(key.toUpperCase());
                            }
                            else {
                                let a = stackLabels.indexOf(key)
                                obj = {
                                    'value': value.length,
                                    'label': key.toUpperCase()
                                }
                                pieData[a] = obj
                            }
                        })
                        if (addToList) {
                            questionsObj = {
                                'key': key,
                                'type': 'stackedchart',
                                'xValue': xValueFormatter,
                                'chartData': chartData
                            }
                            questions.push(questionsObj)
                        }
                        else {
                            questionsObj = {
                                'key': key,
                                'type': 'pie',
                                chartData: pieData
                            }
                            questions.push(questionsObj)
                        }
                    })
                    navigation.navigate('feedbackChart', { questions: questions })
                })
            }
            if (apiStatus && prevProps.apiStatus != apiStatus && apiStatus.error) {
                this.setState({ isLoading: false })
                alert(Strings.api_status + apiStatus.message)
            }
        }
    }

    getDatesFromSelectedRange(selectedRange, customStartDate, customEndDate) {
        let currentDate = new Date()
        switch (selectedRange) {
            case 'lastMonth':
                this.setState({
                    headerLabel: Strings.last_month
                })
                var firstDay = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
                var lastDay = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), 0));
                return { startDate: firstDay, endDate: lastDay };
            case 'lastWeek':
                this.setState({
                    headerLabel: Strings.last_week
                })
                let lastWeekDate = new Date(new Date().setDate(currentDate.getDate() - 7))
                var firstDay = new Date(new Date().setDate(currentDate.getDate() - 7 - lastWeekDate.getDay()));
                var lastDay = new Date(new Date().setDate(currentDate.getDate() - 7 - lastWeekDate.getDay()));
                lastDay.setDate(lastDay.getDate() + 6);
                return { startDate: firstDay, endDate: lastDay };
            case 'lastDay':
                this.setState({
                    headerLabel: Strings.last_day
                })
                currentDate.setDate(currentDate.getDate() - 1)
                return { startDate: new Date(currentDate), endDate: new Date(new Date()) };
            case 'custom':
                this.setState({
                    headerLabel: customStartDate + ' to ' + customEndDate
                })
                return { startDate: new Date(customStartDate), endDate: new Date(customEndDate) };
            default:
                return null;

        }
    }

    handleFilterClicked(range, index, startDate, endDate) {
        this.setState({
            range,
            startDate,
            endDate
        })
        let dateRange = this.getDatesFromSelectedRange(range, startDate, endDate)
        if (index == 0) {
            if (dateRange) {
                let dateQuery = {
                    "query": {
                        "range": {
                            "created_on_iso": {
                                "gte": dateRange.startDate.toISOString(),
                                "lte": dateRange.endDate.toISOString()
                            }
                        }
                    }
                }
                this.setState({
                    isLoading: true,
                    dateQuery
                }, () => {
                    let apiObj = new GetChartDataCountAction(dateQuery);
                    this.props.APITransport(apiObj);
                })
            }
            else {
                this.setState({
                    isLoading: true,
                    dateQuery: {}
                }, () => {
                    let apiObj = new GetChartDataCountAction(this.state.dateQuery);
                    this.props.APITransport(apiObj);
                })
            }
        }
        else if (index == 1) {
            if (dateRange) {
                let dateQuery = {
                    "query": {
                        "range": {
                            "created_on": {
                                "gte": dateRange.startDate.toISOString(),
                                "lte": dateRange.endDate.toISOString()
                            }
                        }
                    }
                }
                this.setState({
                    isLoading: true,
                    dateQuery
                }, () => {
                    let apiObj = new GetFeedbacktDataCountAction(dateQuery);
                    this.props.APITransport(apiObj);
                })
            }
            else {
                this.setState({
                    isLoading: true,
                    dateQuery: {}
                }, () => {
                    let apiObj = new GetFeedbacktDataCountAction(this.state.dateQuery);
                    this.props.APITransport(apiObj);
                })
            }
        }

    }

    render() {
        const { isLoading } = this.state
        return (
            <View>
                <HeaderComponent title={Strings.dashboard} />
                <FilterComponent
                    filterClickedHandler={this.handleFilterClicked.bind(this)}
                    {...this.props}
                />
                {isLoading && <Spinner animating={isLoading} />}
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        apiStatus: state.apiStatus,
        getChartData: state.getChartData,
        getChartDataCount: state.getChartDataCount,
        getFeedbackDataCount: state.getFeedbackDataCount,
        getFeedbackData: state.getFeedbackData
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        APITransport: APITransport
    }, dispatch)
}

export default (connect(mapStateToProps, mapDispatchToProps)(FilterContainer));
