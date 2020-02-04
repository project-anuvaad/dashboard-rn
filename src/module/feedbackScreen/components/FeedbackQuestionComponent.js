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
        this.props.navigation.navigate('feedbackChart', { charts: question});
    }

    renderQuestions = () => {
        const { questions } = this.props
        if(questions) {
            return (
                questions.map((question, index) => {
                    return(
                        <View 
                            style={{ marginVertical: '2%', marginHorizontal: '4%',}}
                            key={index}
                        >
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