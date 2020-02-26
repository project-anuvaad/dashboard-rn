import React, { Component } from 'react'
import { View, Dimensions } from 'react-native'
import ChartScreenComponent from '../component/chartScreenComponent'
import APITransport from '../../../flux/actions/transport/apiTransport'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash'
import Spinner from '../../common/components/loadingIndicator';
import HeaderComponent from '../../common/components/HeaderComponent';
import Strings from '../../../utils/Strings'
import {sortArray} from '../../../utils/CommonUtils'


const { height } = Dimensions.get('window')
const stackLabels = [Strings.Bengali, Strings.English, Strings.Gujarati, Strings.Hindi, Strings.Malayalam, Strings.Marathi, Strings.Tamil, Strings.Telugu, Strings.Kannada, Strings.Punjabi]

class ChartScreenContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            highCourtNames: [
                {
                    KAHC: Strings.karnataka,
                    TSHC: Strings.telangana,
                    GUHC: Strings.gujarat,
                    WBHC: Strings.west_bengal,
                    BMHC: Strings.maharashtra,
                    KLHC: Strings.kerala,
                    HRHC: Strings.haryana,
                    UKHC: Strings.uttarakhand,
                    TNHC: Strings.tamilnadu,
                    UPHC: Strings.uttar_pradesh,
                    APHC: Strings.andhra_pradesh,
                    CGHC: Strings.chhattisgarh,
                    RJHC: Strings.rajasthan,
                    PUHC: Strings.punjab,
                    HMHC: Strings.himachal,
                    BRHC: Strings.bihar,
                    JHHC: Strings.jharkhand,
                }
            ],
            doc_courts: [],
            xValueFormatter: [],
            getDocCountPerCourt: [],
            getUsersCountPerCourt: [],
            getSentenceCount: [],
            getwordCount: [],
            getTargetlanguages: [],
            getLanguagesByCourt: [],
            isLoading: false,
            headerLabel: Strings.till_today,
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
        this.getHeaderLabel(selectedRange, startDate, endDate)
        if (params && params.data && params.data.hits && params.data.hits.hits) {
            this.createCharts(params.data.hits.hits);
        }

    }

    getHeaderLabel(selectedRange, customStartDate, customEndDate) {        
        switch (selectedRange) {
            case 'lastMonth':
                this.setState({
                    headerLabel: Strings.last_month
                })
                return
            case 'lastWeek':
                this.setState({
                    headerLabel: Strings.last_week
                })
                return
            case 'lastDay':
                this.setState({
                    headerLabel: Strings.last_day
                })
                return
            case 'custom':
                this.setState({
                    headerLabel: customStartDate + ' to ' + customEndDate
                })
                return
            default:
                return null;

        }
    }
  
    createCharts = (sourceActualArray) => {
        // for Document Per Court Chart
        let xValueFormatter = [];
        let ar = []
        let getTargetlanguages = [{},{},{},{},{},{},{},{},{},{}]
        // let sourceArray = _.filter(sourceActualArray, function (o) {
        //     if (dateRange) {
        //         if (new Date(o._source.created_on_iso) >= dateRange.startDate && new Date(o._source.created_on_iso) <= dateRange.endDate) {
        //             return o
        //         }
        //     } else {
        //         return o
        //     }
        // })
        let fileterArray = sourceActualArray.map(function (o) {
            if (o._source && o._source.high_court_name) {
                return o._source
            }
        })
        let groupByName = _.groupBy(fileterArray, "high_court_code")
        delete groupByName.undefined
        let self = this
        _.forOwn(groupByName, function (value, key) {
            let doc_count_obj = {
                'key': key,
                'value': value,
                'y': value.length
            }
            ar.push(doc_count_obj)            
            xValueFormatter.push(self.state.highCourtNames[0][key.toUpperCase()].toUpperCase())
            // xValueFormatter.push(key.toUpperCase());
        });
        ar = sortArray(ar, 'y')
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
        getUsersCountPerCourt = sortArray(getUsersCountPerCourt, 'y')
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
            getSentenceCount.push({ y: sentence_count/1000 })
            getwordCount.push({ y: word_count/1000 })
        });
        getSentenceCount = sortArray(getSentenceCount, 'y')
        getwordCount = sortArray(getwordCount, 'y')
        this.setState({ getSentenceCount, getwordCount })
        // for target languages
        let groupByTargetLang = _.groupBy(fileterArray, "target_lang")
        delete groupByTargetLang.undefined
        _.forOwn(groupByTargetLang, function (value, key) {
            if (key !== undefined) {                
                let a = stackLabels.indexOf(key)
                let tar_lan_obj = {
                    'value': value.length,
                    'label': Strings[key] ? Strings[key] : key
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
        getTargetlanguages = sortArray(getTargetlanguages, 'value')
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
        this.props.navigation.navigate('filterScreen')
    }

    render() {        
        const { getDocCountPerCourt, getUsersCountPerCourt, getSentenceCount, getwordCount, getTargetlanguages, getLanguagesByCourt, isLoading, headerLabel } = this.state
        return (
            <View style={{ height }}>
                <HeaderComponent title={headerLabel} backButton={true} backClick={this.onBackClick}/>
                <ChartScreenComponent
                    xValueFormatter={this.state.xValueFormatter}
                    getDocCountPerCourt={getDocCountPerCourt}
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