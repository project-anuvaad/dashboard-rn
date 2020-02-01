import React, { Component } from 'react';
import { View } from 'react-native';
import FeedbackChartComponent from '../components/FeedbackChartComponent'
import _ from 'lodash'
import HeaderComponent from '../../common/components/HeaderComponent';

class FeedbackChartContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chartDataFeedback: [],
            pieData: [],
            xValue: [],
            type: null
        }
    }

    componentDidMount() {
        const { params } = this.props.navigation.state
        if(params && params.chartData && params.type) {
            if(params.type == 'chart') {
                this.setState({
                    chartDataFeedback: params.chartData,
                    xValue: params.xValue,
                    type: params.type
                })    
            }
            else {
                this.setState({
                    pieData: params.chartData,
                    xValue: [],
                    type: params.type
                })
            }
        }
    }

    onBackClick = () => {
        this.props.navigation.navigate('feedbackQuestions')
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
                    type={params.type ? params.type : this.state.type}
                    chartDataFeedback={this.state.chartDataFeedback}
                    pieData={this.state.pieData}
                    xValue={this.state.xValue}
                    onClickCard={this.onClickCard}
                    {...this.props}
                />
            </View>
        )
    }
}

export default FeedbackChartContainer;