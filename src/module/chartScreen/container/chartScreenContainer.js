import React, { Component } from 'react'
import { View, Dimensions } from 'react-native'
import ChartScreenComponent from '../component/chartScreenComponent'
import APITransport from '../../../flux/actions/transport/apiTransport'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GetChartDataCountAction } from '../../../flux/actions/apis/getChartDataCountAction'
import { GetChartDataAction } from '../../../flux/actions/apis/getChartDataAction'
import Content from '../../../data'
import _ from 'lodash'
import Spinner from '../../common/components/loadingIndicator';
import HeaderComponent from '../../common/components/HeaderComponent';


const { height } = Dimensions.get('window')
const stackLabels = ['Bengali', 'English', 'Gujarati', 'Hindi', 'Malayalam', 'Marathi', 'Tamil', 'Telugu', 'Kannada', 'Punjabi']
class ChartScreenContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            doc_courts: [],
            xValueFormatter: [],
            getDocCountPerCourt: [],
            getUsersCountPerCourt: [],
            getSentenceCount: [],
            getwordCount: [],
            getTargetlanguages: [],
            getLanguagesByCourt: [],
            isLoading: false,
            headerLabel: 'All'
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
        const { params } = this.props.navigation.state;
        const selectedRange = params ? params.selectedRange : null;
        const startDate = params ? params.startDate : null;
        const endDate = params ? params.endDate : null;
        let dateRange = this.getDatesFromSelectedRange(selectedRange, startDate, endDate)
        if (this.props.getChartData && this.props.getChartData.hits && this.props.getChartData.hits.hits) {
            this.createCharts(this.props.getChartData.hits.hits, dateRange);
        }

    }

    getDatesFromSelectedRange(selectedRange, customStartDate, customEndDate) {
        let currentDate = new Date()
        switch (selectedRange) {
            case 'lastMonth':
                this.setState({
                    headerLabel: 'Last Month'
                })
                var firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
                var lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
                return { startDate: firstDay, endDate: lastDay };
            case 'lastWeek':
                this.setState({
                    headerLabel: 'Last Week'
                })
                let lastWeekDate = new Date(new Date().setDate(currentDate.getDate() - 7))
                var firstDay = lastWeekDate.getDate() - lastWeekDate.getDay();
                var lastDay = firstDay + 6;
                return { startDate: new Date(new Date(new Date().setDate(firstDay)).setHours(0, 0, 0, 0)), endDate: new Date(new Date(new Date().setDate(lastDay)).setHours(23, 59, 59, 59)) };
            case 'lastDay':
                this.setState({
                    headerLabel: 'Last Day'
                })
                currentDate.setDate(currentDate.getDate() - 1)
                console.log({ startDate: new Date(currentDate.setHours(0, 0, 0, 0)), endDate: new Date(new Date().setHours(0, 0, 0, 0)) })
                return { startDate: new Date(currentDate.setHours(0, 0, 0, 0)), endDate: new Date(new Date().setHours(0, 0, 0, 0)) };
            case 'custom':
                this.setState({
                    headerLabel: 'Custom'
                })
                console.log({ startDate: new Date(customStartDate), endDate: new Date(customEndDate) })
                return { startDate: new Date(customStartDate), endDate: new Date(customEndDate) };
            default:
                return null;

        }
    }
  
    createCharts = (sourceActualArray, dateRange) => {
        // for Document Per Court Chart
        let xValueFormatter = [];
        let ar = []
        let getTargetlanguages = [{},{},{},{},{},{},{},{},{},{}]
        let sourceArray = _.filter(sourceActualArray, function (o) {
            if (dateRange) {
                if (new Date(o._source.created_on_iso) >= dateRange.startDate && new Date(o._source.created_on_iso) <= dateRange.endDate) {
                    return o
                }
            } else {
                return o
            }
        })
        let fileterArray = sourceArray.map(function (o) {
            if (o._source && o._source.high_court_name) {
                return o._source
            }
        })
        let groupByName = _.groupBy(fileterArray, "high_court_code")
        delete groupByName.undefined
        _.forOwn(groupByName, function (value, key) {
            let doc_count_obj = {
                'key': key,
                'value': value,
                'y': value.length
            }
            ar.push(doc_count_obj)
            xValueFormatter.push(key.toUpperCase());
        });
        this.setState({ xValueFormatter, getDocCountPerCourt: ar })
        // for Users per Court Chart
        let getUsersCountPerCourt = []
        let usersPerCourt = ar.map((v) => {
            return _.uniqBy(v.value, obj => obj.user_id);
        })
        _.forOwn(usersPerCourt, function (value, key) {
            let user_court_obj = {
                'y': value.length,
            }
            getUsersCountPerCourt.push(user_court_obj)
        });
        this.setState({ getUsersCountPerCourt })
        // for sentence Count and word Count per court
        let getSentenceCount = []
        let getwordCount = []
        _.forEach(ar, function (v1, k1) {
            let sentence_count = 0
            let word_count = 0
            _.forEach(v1.value, function (v2, k2) {
                sentence_count += v2.sentence_count
                word_count += v2.word_count
            })
            getSentenceCount.push({ y: sentence_count })
            getwordCount.push({ y: word_count })
        });
        this.setState({ getSentenceCount, getwordCount })
        // for target languages
        let groupByTargetLang = _.groupBy(fileterArray, "target_lang")
        delete groupByTargetLang.undefined
        _.forOwn(groupByTargetLang, function (value, key) {
            if (key !== undefined) {
                let a = stackLabels.indexOf(key)
                let tar_lan_obj = {
                    'value': value.length,
                    'label': key
                }
                getTargetlanguages[a]= tar_lan_obj
            }
        })
        getTargetlanguages = getTargetlanguages.filter((lang)=>{
            if(!lang || !lang.value){
                return false
            }
            return true
        })
        console.log(getTargetlanguages)
        this.setState({ getTargetlanguages })
        // for Language By Court
        let getLanguagesByCourt = []
        let positionArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        let langArr = ['', '', '', '', '', '', '', '', '', '']
        _.forEach(ar, function (v1, k1) {
            let lang_obj = {}
            positionArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            langArr = ['', '', '', '', '', '', '', '', '', '']
            _.forEach(v1.value, function (v2, k2) {
                if (lang_obj[v2.target_lang]) {
                    lang_obj[v2.target_lang] += 1
                } else {
                    lang_obj[v2.target_lang] = 1
                }
            })
            _.forOwn(lang_obj, function (value, key) {
                let a = stackLabels.indexOf(key)
                positionArr[a] = value
                langArr[a] = key
            })
            let lang_court_obj = {
                'y': positionArr,
                // 'marker': langArr
            }
            getLanguagesByCourt.push(lang_court_obj)
        })
        this.setState({ getLanguagesByCourt, isLoading: false })
    }

    onClickCard = (data) => {
        console.log('data', data)
    }

    onBackClick = () => {
        console.log('onBackClick')
        this.props.navigation.navigate('filterScreen')
    }

    render() {
        const { getDocCountPerCourt, getUsersCountPerCourt, getSentenceCount, getwordCount, getTargetlanguages, getLanguagesByCourt, isLoading, headerLabel } = this.state
        return (
            <View style={{ height }}>
                <HeaderComponent title={'Dashboard-'+headerLabel} backButton={true} backClick={this.onBackClick}/>
                <ChartScreenComponent
                    xValueFormatter={this.state.xValueFormatter}
                    getDocCountPerCourt={getDocCountPerCourt}
                    stackLabels={stackLabels}
                    getUsersCountPerCourt={getUsersCountPerCourt}

                    getSentenceCount={getSentenceCount}

                    getwordCount={getwordCount}

                    getTargetlanguages={getTargetlanguages}
                    getLanguagesByCourt={getLanguagesByCourt}

                    onClickCard={(data) => this.onClickCard(data)}
                />
                {isLoading && <Spinner animating={isLoading} />}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        apiStatus: state.apiStatus,
        getChartData: state.getChartData,
        getChartDataCount: state.getChartDataCount
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        APITransport: APITransport
    }, dispatch)
}

export default (connect(mapStateToProps, mapDispatchToProps)(ChartScreenContainer));