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
            questions: null
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
            _.forOwn(groupByQuestions, function (value, key) {
                let addToList = false
                chartData = []
                pieData = []
                let questionsObj = {}
                let obj = {}
                let xValueFormatter = []
                let groupByAnswer = _.groupBy(value, "answer") 
                
                _.forOwn(groupByAnswer, function (value, key) {
                    obj = {}
                    if(!isNaN(key)){
                        addToList = true
                        obj = {
                            'key': key,
                            'value': value,
                            'y': value.length
                        }
                        chartData.push(obj)
                        xValueFormatter.push(key.toUpperCase());
                    }
                    else{
                        obj = {
                            'value': value.length,
                            'label': key.toUpperCase()
                        }
                        pieData.push(obj)
                    }
                })
                if(addToList) {
                    questionsObj = {
                        'key': key,
                        'type':  'chart',
                        'averageRating': value.length,
                        'xValue': xValueFormatter,
                        'chartData' : chartData
                    }
                    questions.push(questionsObj)
                }
                else{ 
                    questionsObj = {
                        'key': key,
                        'type':  'pie',
                        'no': 1,
                        'yes': 1,
                        chartData: pieData
                    }
                    questions.push(questionsObj)
                }
            })
            this.setState({
                groupByQuestions,
                questions
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
                    {...this.props}
                />
            </View>
        )
    }
}

export default FeedbackQuestionContainer;