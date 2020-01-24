import React, { Component } from 'react';
import { View, Dimensions, TouchableOpacity, Text, Platform } from 'react-native';
import { Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomButton from '../../common/components/customButton'
import DatePicker from '../../common/components/datePicker'

const { height, width } = Dimensions.get('window')

class FilterComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fromDate: new Date(),
            toDate: new Date(),
            mode: 'date',
            from: false,
            to: false,
            renderView: false
        }
    }

    showDatepicker = (prop) => {
        this.setState({ [prop]: true })
    }

    setDate = (event, date, show, save) => {
        console.log('event', event)
        this.setState({ [show]: false, [save]: date })
    }

    onClickCustom = () => {
        this.setState({ renderView: !this.state.renderView })
    }

    dateRange = (value) => {
        if (value === 'lastMonth') {

        }
    }

    render() {
        return (
            <View style={{ height: height - 60 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', width, height: '100%' }}>

                    <CustomButton label={'Last Month'} onPressButton={() => this.dateRange('lastMonth')} />
                    <CustomButton label={'Last Week'} onPressButton={() => this.dateRange('lastWeek')} />
                    <CustomButton label={'Last Day'} onPressButton={() => this.dateRange('lastDay')} />
                    <CustomButton label={'Custom Date'} onPressButton={() => this.onClickCustom()} />

                    {
                        this.state.renderView ?
                            <View>
                                <DatePicker
                                    value={this.state.fromDate}
                                    setDate={(event, date) => this.setDate(event, date, 'from', 'fromDate')}
                                    showDatepicker={() => this.showDatepicker('from')}
                                    showPicker={this.state.from}
                                    textValue={this.state.fromDate.toISOString().substring(0, 10)}
                                    label={'From'}
                                />
                                <DatePicker
                                    value={this.state.fromDate}
                                    setDate={(event, date) => this.setDate(event, date, 'to', 'toDate')}
                                    showDatepicker={() => this.showDatepicker('to')}
                                    showPicker={this.state.to}
                                    textValue={this.state.toDate.toISOString().substring(0, 10)}
                                    label={'To'}
                                />
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <CustomButton label={'Submit'} onPressButton={() => this.onClickSubmit()} />
                                </View>
                            </View>
                            : null
                    }
                </View>
            </View>
        );
    }
}

const styles = {

}

export default FilterComponent;