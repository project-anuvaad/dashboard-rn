import React, { Component } from 'react';
import { View } from 'react-native';
import FeedbackQuestionComponent from '../components/FeedbackQuestionComponent'
import _ from 'lodash'
import HeaderComponent from '../../common/components/HeaderComponent';

class FeedbackQuestionContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            groupByQuestions: null,
            questions: null,
            xValue: []
        }
    }

    componentDidMount() {
        const { params } = this.props.navigation.state
        if (params && params.questions) {
            let questionsArr = []
            let questions = []
            params.questions.hits.hits.forEach(items => {
                questionsArr.push(items._source)
            });
            let groupByQuestions = _.groupBy(questionsArr, "question")
            
            let chartData = []
            let pieData = []
            let xValue = []
            _.forOwn(groupByQuestions, function (value, key) {
                let addToList = false
                let yesCount = 0
                pieData = []
                let noCount = 0
                let valueSum = 0
                let questionsObj = {}
                value.map((v) => {
                    if (!isNaN(v.answer)) {
                        addToList = true
                        valueSum += v.answer
                    }
                    else {
                        if(v.answer == 'no') {
                            noCount++
                        }
                        else {
                            yesCount++
                            
                        }

                    }
                    
                })
                if (addToList) {
                    let obj = {
                        'key': key,
                        'value': value,
                        'y': valueSum / value.length
                    }
                    chartData.push(obj)
                    questionsObj = {
                        'key': key,
                        'type':  'chart',
                        'averageRating': obj.y,
                        'chartData' : chartData
                    }
                    
                    questions.push(questionsObj)
                    
                    xValue.push(key)
                }
                else {
                        let obj1 = {
                            'value': noCount,
                            'label': 'No'
                        }
                        let obj2 = {
                            'value': yesCount,
                            'label': 'Yes'
                        }
                        pieData.push(obj1, obj2)

                        questionsObj = {
                            'key': key,
                            'type':  'pie',
                            'no': noCount,
                            'yes': yesCount,
                            chartData: pieData
                        }
                        questions.push(questionsObj)
                }
            })
            
            this.setState({
                groupByQuestions,
                questions,
                xValue
            })
        }
    }

    onBackClick = () => {
        this.props.navigation.navigate('filterScreen')
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#FFFFFF'}}>
                <HeaderComponent title={'Feedback'} backButton={true} backClick={this.onBackClick}/>
                <FeedbackQuestionComponent
                    questions={this.state.questions}
                    xValue={this.state.xValue}
                    {...this.props}
                />
            </View>
        )
    }
}

export default FeedbackQuestionContainer;