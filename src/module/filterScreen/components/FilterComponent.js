import React, { Component } from 'react';
import { View, Dimensions, TouchableOpacity, Text, Platform, ScrollView } from 'react-native';
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
            renderView: false,
            index: 0,
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

    onFirstTabClicked = () => {
        this.setState({
            index: 0
        })
    }
    onSecondTabClicked = () => {
        this.setState({
            index: 1
        }, this.props.feedbackClicked())
    }
    render() {
        const { index } = this.state
        return (
            <View style={{ height: height - 60, paddingVertical: '2%' }}>
                <View style={styles.tabContainer}>
                    <CustomButton
                        customViewStyle={{ margin: '0%', width: '50%', justifyContent: 'center' }}
                        customBtnStyle={{ height: 50 }}
                        customLabelStyle={index == 0 ? styles.activeTab : styles.inactiveTab}
                        label={'Documents'}
                        onPressButton={() => this.onFirstTabClicked()}
                    />
                    <View
                        style={{ width: 1, backgroundColor: 'white', height: '100%', margin: '0%' }}
                    />
                    <CustomButton
                        customViewStyle={{ margin: '0%', width: '50%', justifyContent: 'center' }}
                        customBtnStyle={{ height: 50 }}
                        customLabelStyle={index == 1 ? styles.activeTab : styles.inactiveTab}
                        label={'Feedback'}
                        onPressButton={() => this.onSecondTabClicked()}
                    />

                </View>
                <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', width, paddingBottom: '20%', paddingTop: '20%' }}>

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
                </ScrollView>
            </View>
        );
    }
}

const styles = {
    tabContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        width: '90%',
        height: '9%',
        backgroundColor: '#409DD6',
        borderRadius: 8,
        elevaion: 8,
        paddingHorizontal: '1%'
    },
    activeTab: {
        color: 'white',
        fontWeight: 'bold'
    },
    inactiveTab: {
        color: 'white',
        fontWeight: 'normal'
    }
}

export default FilterComponent;