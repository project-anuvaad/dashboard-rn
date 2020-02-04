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
        // const { type, chartDataFeedback, xValue, pieData } = this.props
        const { questions } = this.props
        if(questions) {
            return (
                questions.map((item, index) => {
                    return (
                        <View key={index}>
                            {item.type === 'chart' &&
                            <BarChartVertical
                                title={item.key}
                                xValueFormatter={item.xValue}
                                chartData={item.chartData}
                                onClickCard={(data) => this.props.onClickCard(data)}
                                label={'Rating'}
                            />
                    }
                    {item.type === 'pie' && 
                            <PieChartScreen
                                title={item.key}
                                getTargetlanguages={item.chartData}
                                customCardStyle={{height: height * .7}}
                                customCardContentStyle={{height: height * .7}}
                            />}                
                        </View>
                        )
                })
            )
        }
    }

    render() { 
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