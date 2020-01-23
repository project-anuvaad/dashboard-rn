import React, { Component } from 'react'
import { View, Text, Dimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import ChartScreenComponent from '../component/chartScreenComponent'
import APITransport from '../flux/actions/transport/apiTransport'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GetChartDataAction } from '../flux/actions/apis/getChartDataAction'
import Content from '../../src/data'
import _ from 'lodash'


const { height } = Dimensions.get('window')
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
            getTargetlanguages: []
        }
    }

    componentDidMount() {
        // let apiObj = new GetChartDataAction();
        // this.props.APITransport(apiObj);
        let data = Content.hits
        let sourceArray = data.hits
        console.log('sourceArray', sourceArray)

        // for Document Per Court Chart

        let xValueFormatter = [];
        let ar = []
        let getDocCountPerCourt = []
        let getTargetlanguages = []

        let fileterArray = _.filter(sourceArray, function (o) {
            return o._source.high_court_name &&
                o._source
        })

        let groupByName = _.groupBy(fileterArray, "_source.high_court_name")
        _.forOwn(groupByName, function (value, key) {
            let doc_count_obj = {
                'key': key,
                'value': value
            }
            ar.push(doc_count_obj)
            xValueFormatter.push(key);
        });
        let DocCountPerCourt = ar.map((v) => {
            return _.uniqBy(v.value, obj => obj._source.document_id);
        })
        _.forOwn(DocCountPerCourt, function (value, key) {
            let a = {
                'y': value.length,
            }
            getDocCountPerCourt.push(a)
        });
        this.setState({ xValueFormatter, getDocCountPerCourt })

        // for Users per Court Chart

        let getUsersCountPerCourt = []
        let usersPerCourt = ar.map((v) => {
            return _.uniqBy(v.value, obj => obj._source.user_id);
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
        let common_count = []
        _.forEach(ar, function (v1, k1) {
            _.forEach(v1.value, function (v2, k2) {
                if (v2._source.high_court_name === v1.key) {
                    let count_obj = {
                        'court_name': v1.key,
                        'sentence_count': v2._source.sentence_count,
                        'word_count': v2._source.word_count,
                    }
                    common_count.push(count_obj)
                }
            })
        });
        let sortByKey = _.groupBy(common_count, "court_name")
        _.forOwn(sortByKey, function (value, key) {
            let sentence_count_court = _.sumBy(value, function (v) {
                return v.sentence_count;
            });
            let sentence_count_court_obj = {
                'y': sentence_count_court
            }
            let word_count_court = _.sumBy(value, function (v1) {
                return v1.word_count;
            });
            let word_count_court_obj = {
                'y': word_count_court
            }
            getSentenceCount.push(sentence_count_court_obj)
            getwordCount.push(word_count_court_obj)
        })
        this.setState({ getSentenceCount, getwordCount })


        // for target languages

        let groupByTargetLang = _.groupBy(fileterArray, "_source.target_lang")
        delete groupByTargetLang.undefined
        _.forOwn(groupByTargetLang, function (value, key) {
            if (key !== undefined) {
                let tar_lan_obj = {
                    'label': key,
                    'value': value.length
                }
                getTargetlanguages.push(tar_lan_obj)
            }
        })

        this.setState({ getTargetlanguages })

        // for Language By Court
        
        let lang_count = [];
        let lang_Per_court_arr = []
        let dummyArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        _.forEach(ar, function (v1, k1) {
            _.forEach(v1.value, function (v2, k2) {
                if (v2._source.high_court_name === v1.key) {
                    let count_obj = {
                        'court_name': v1.key,
                        'lang': v2._source.source_lang,
                    }
                    lang_count.push(count_obj)
                }
            })
        })
        let groupByLangPerCout = _.groupBy(lang_count, "court_name")
        let self = this
        _.forEach(groupByLangPerCout, function (va, ke) {
            let grouplang = _.groupBy(va, "lang")
            // console.log(grouplang)
            let b = _.forOwn(grouplang, function (value, key) {
                console.log(key, value.length, ke)
                if (key !== undefined) {
                    let a = self.checkPosition(key)
                    dummyArr[a] = value.length
                    // console.log(dummyArr)
                }
            })
            let lang_court_obj = {
                'key': ke,
                'value': dummyArr
            }
            lang_Per_court_arr.push(lang_court_obj)
            // console.log('du', dummyArr)

        })
        console.log(lang_Per_court_arr)


    }

    checkPosition(v) {
        if (v !== undefined) {
            let pos = 0
            switch (v) {
                case 'Tamil':
                    pos = 7
                    break;
                case 'English':
                    pos = 1
                    break;
                case 'Hindi':
                    pos = 3
                    break;
                default:
                    pos = 0
            }
            return pos
        }
    }

    onClickCard = (data) => {
        console.log('data', data)
    }

    render() {
        const { getDocCountPerCourt, getUsersCountPerCourt, getSentenceCount, getwordCount, getTargetlanguages } = this.state
        return (
            <View style={{ height }}>
                <ChartScreenComponent

                    xValueFormatter={this.state.xValueFormatter}
                    getDocCountPerCourt={getDocCountPerCourt}

                    getUsersCountPerCourt={getUsersCountPerCourt}

                    getSentenceCount={getSentenceCount}

                    getwordCount={getwordCount}

                    getTargetlanguages={getTargetlanguages}

                    onClickCard={(data) => this.onClickCard(data)}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    console.log('data', state)
    return {
        apiStatus: state.apiStatus,
        getChartData: state.getChartData
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        APITransport: APITransport
    }, dispatch)
}

export default (connect(mapStateToProps, mapDispatchToProps)(ChartScreenContainer));