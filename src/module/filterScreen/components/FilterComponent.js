import React, { Component } from 'react';
import { View, Dimensions, TouchableOpacity, Text, Platform } from 'react-native';
import { Button } from 'react-native-paper';
import DateTimePicker from 'react-native-modal-datetime-picker'
import CustomButton from '../../common/components/customButton'
import DatePicker from '../../common/components/datePicker'

const { height, width } = Dimensions.get('window')

class FilterComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fromDate: new Date().toISOString().substring(0, 10),
            toDate: new Date().toISOString().substring(0, 10),
            mode: 'date',
            from: false,
            to: false,
            minimumDate: null,
            renderView: false
        }
    }

    componentDidMount() {
        this.props.navigation.addListener('willBlur', () => {
            this.setState({
                fromDate: new Date().toISOString().substring(0, 10),
                toDate: new Date().toISOString().substring(0, 10),
                mode: 'date',
                from: false,
                to: false,
                minimumDate: null,
                renderView: false
            })
        })
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

    onClickSubmit(){
        this.props.filterClickedHandler('custom',this.state.fromDate, this.state.toDate)
    }

    dateRange = (value) => {
        this.props.filterClickedHandler(value)
    }

    onFromDateChanged = (date) => {
        // if(event.type !== 'dismissed') {
        //     this.setDate(event, date, 'from', 'fromDate')
        // }
        this.onCancelFrom()
        var dateData = new Date(date)
        this.setState({
            minimumDate: dateData,
        })
        let monthData = dateData.getMonth() + 1
        let currentDate =
        dateData.getDate().toString().length < 2
            ? '0' + dateData.getDate()
            : dateData.getDate()
        let month =
        String(monthData).length < 2 ? '0' + monthData : monthData
        let year = dateData.getFullYear()

        this.setState({
            fromDate: year + '-' + month + '-' + currentDate
        })

        

    }

    onToDateChanged = (date) => {
        // if(event.type !== 'dismissed') {
        //     this.setDate(event, date, 'to', 'toDate')
        // }
        this.onCancelTo()
        var dateData = new Date(date)
        let monthData = dateData.getMonth() + 1
        let currentDate = dateData.getDate().toString().length < 2
            ? '0' + dateData.getDate()
            : dateData.getDate()
        let month =
        String(monthData).length < 2 ? '0' + monthData : monthData
        let year = dateData.getFullYear()
        this.setState({
            toDate: year + '-' + month + '-' + currentDate
        })
        
    }
    onCancelFrom = () => {
        this.setState({
            from: false
        })
    }
    onCancelTo = () => {
        this.setState({
            to: false
        })
    }

    render() {
        console.log('this.state', this.state.from, this.state.to)
        return (
            <View style={{ height: height - 60 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', width, height: '100%',marginTop:'-12%' }}>

                    <CustomButton label={'Show All'} onPressButton={() => this.dateRange('all')} />
                    <CustomButton label={'Last Month'} onPressButton={() => this.dateRange('lastMonth')} />
                    <CustomButton label={'Last Week'} onPressButton={() => this.dateRange('lastWeek')} />
                    <CustomButton label={'Last Day'} onPressButton={() => this.dateRange('lastDay')} />
                    <CustomButton label={'Custom Date'} onPressButton={() => this.onClickCustom()} />

                    {
                        this.state.renderView ?
                            <View>
                                <DatePicker
                                    // value={this.state.fromDate}
                                    // setDate={(event, date) => {
                                    //     this.onFromDateChanged(event, date)
                                    // }}
                                    // onConfirmFrom={this.onFromDateChanged}
                                    // onCancelFrom={this.onCancel}
                                    showDatepicker={() => this.showDatepicker('from')}
                                    // showPickerFrom={this.state.from}
                                    textValue={this.state.fromDate}
                                    label={'From'}
                                />
                                <DateTimePicker
                                    isVisible={this.state.from}
                                    onConfirm={this.onFromDateChanged}
                                    onCancel={this.onCancelFrom}
                                    maximumDate={new Date()}
                                    mode='date'
                                />
                                <DatePicker
                                    // value={this.state.toDate}
                                    // setDate={(event, date) => this.onToDateChanged(event, date)}
                                    // onConfirmTo={this.onToDateChanged}
                                    // onCancelTo={this.onCancel}
                                    showDatepicker={() => this.showDatepicker('to')}
                                    // showPickerTo={this.state.to}
                                    textValue={this.state.toDate}
                                    label={'To'}
                                />
                                <DateTimePicker
                                    isVisible={this.state.to}
                                    onConfirm={this.onToDateChanged}
                                    onCancel={this.onCancelTo}
                                    maximumDate={new Date()}
                                    minimumDate={this.state.minimumDate ? new Date(this.state.minimumDate) : new Date(1)}
                                    mode='date'
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