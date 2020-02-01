import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import QuestionCard from '../../common/components/QuestionCard'

class FeedbackQuestionComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    onClickCard = (question) => {
        // const { question } = this.props
        // if(question.type == 'pie') {
            console.log('questionquestionquestion', question)
            this.props.navigation.navigate('feedbackChart', { chartData: question.chartData, xValue: this.props.xValue, type: question.type});
        // }
    }

    renderQuestions = () => {
        const { questions } = this.props
        console.log('questions', questions)
        if(questions) {
            return (
                questions.map(question => {
                    return(
                        <View style={{ marginVertical: '2%', marginHorizontal: '4%',}}>
                            <QuestionCard 
                                Question={question.key}
                                chart={question.type == 'chart'}
                                rating={question.type == 'chart' && question.averageRating}
                                noCount={question.type != 'chart' && question.no}
                                yesCount={question.type != 'chart' && question.yes}
                                onClickCard={() => this.onClickCard(question)}
                            />
                        </View>
                    )
                    
                })
            )
        }
        else {
            return(
                <Text>No Data available</Text>
            );
        }
    }
    render() {
        return(
            <ScrollView 
                contentContainerStyle={{ paddingBottom: '20%'}}
                bounces={false}
                showsVerticalScrollIndicator={false}
            >
                {this.renderQuestions()}
            </ScrollView>
        )
    }
}

export default FeedbackQuestionComponent;