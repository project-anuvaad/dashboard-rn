import React, { Component } from 'react';
import { View } from 'react-native';
import FeedbackChartComponent from '../components/FeedbackChartComponent'
import _ from 'lodash'
import HeaderComponent from '../../common/components/HeaderComponent';
import Strings from '../../../utils/Strings';

class FeedbackChartContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            headerLabel: Strings.till_today
        }
    }

    componentDidMount() {
        const { params } = this.props.navigation.state;
        const selectedRange = params ? params.selectedRange : null;
        const startDate = params ? params.startDate : null;
        const endDate = params ? params.endDate : null;
        this.getHeaderLabel(selectedRange, startDate, endDate)
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
                <HeaderComponent title={this.state.headerLabel} backButton={true} backClick={this.onBackClick}/>
                <FeedbackChartComponent
                    questions={params.questions}
                    onClickCard={this.onClickCard}
                    {...this.props}
                />
            </View>
        )
    }
}

export default FeedbackChartContainer;