import React, { Component } from 'react';
import { View } from 'react-native';
import FeedbackChartComponent from '../components/FeedbackChartComponent'
import _ from 'lodash'
import HeaderComponent from '../../common/components/HeaderComponent';

class FeedbackChartContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            questions: []
        }
    }


    onBackClick = () => {
        this.props.navigation.navigate('filterScreen')
    }
    onClickCard = (data) => {
        console.log('data', data)
    }

    render() {
        const { params } = this.props.navigation.state
        return (
            <View style={{ flex: 1, backgroundColor: '#FFFFFF'}}>
                <HeaderComponent title={'Feedback'} backButton={true} backClick={this.onBackClick}/>
                <FeedbackChartComponent
                    questions={this.state.questions}
                    onClickCard={this.onClickCard}
                    {...this.props}
                />
            </View>
        )
    }
}

export default FeedbackChartContainer;