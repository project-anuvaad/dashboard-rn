import React, { Component } from 'react';
import { View, ScrollView, Text, Dimensions } from 'react-native';
import BarChartVertical from '../../chartScreen/component/BarChartVertical';
import PieChartScreen from '../../chartScreen/component/PieChartScreen';

const { height } = Dimensions.get('window');

class FeedbackChartComponent extends Component {
    constructor(props) {
        super(props);
    }
    renderCharts = () => {
        const { type, chartDataFeedback, xValue, pieData } = this.props
        console.log('questions', type)
        if(type != null) {
        return (
            <View>
                {type === 'chart' ?
                <BarChartVertical
                    title={'Feedback'}
                    xValueFormatter={xValue}
                    chartData={chartDataFeedback}
                    onClickCard={(data) => this.props.onClickCard(data)}
                    label={'Average Rating'}
                />
                    :
                <PieChartScreen
                    title={'Feedback'}
                    getTargetlanguages={pieData}
                    customCardStyle={{height: height * .7}}
                    customCardContentStyle={{height: height * .7}}

                />}                
            </View>
            )
        }
    }
    render() { 
        const { type, chartDataFeedback, xValue, pieData } = this.props
        console.log('this.props', this.props)
        return(
            <ScrollView 
                contentContainerStyle={{ paddingBottom: '20%'}}
                bounces={false}
                showsVerticalScrollIndicator={false}
            >
            {this.renderCharts()}
            </ScrollView>
        )
    }
}

export default FeedbackChartComponent;