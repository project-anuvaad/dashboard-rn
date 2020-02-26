import React, { Component } from 'react';
import { View, Dimensions, ScrollView, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker'
import CustomButton from '../../common/components/customButton'
import DatePicker from '../../common/components/datePicker'
import Strings from '../../../utils/Strings';

const { height, width } = Dimensions.get('window')

class FilterComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fromDate: new Date().toISOString().substring(0, 10),
            toDate: new Date().toISOString().substring(0, 10),
            currentFromDate: new Date(),
            currentToDate: new Date(),
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
                renderView: false,
                // index: 0,
                currentFromDate: new Date(),
                currentToDate: new Date()
            })
        })
    }

    showDatepicker = (prop) => {
        this.setState({ [prop]: true })
    }

    onClickCustom = () => {
        this.setState({ renderView: !this.state.renderView })
    }

    onClickSubmit(){
        this.props.filterClickedHandler('custom', this.state.index, this.state.fromDate, this.state.toDate)
    }

    dateRange = (value, index) => {
        this.props.filterClickedHandler(value, index)
    }

    onFromDateChanged = (date) => {
        this.onCancelFrom()
        var dateData = new Date(date)
        this.setState({
            minimumDate: dateData,
            currentFromDate: dateData
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
            toDate: year + '-' + month + '-' + currentDate,
            currentToDate: dateData
        })
    }

    onCancelFrom = () => {
        this.setState({ from: false })
    }

    onCancelTo = () => {
        this.setState({ to: false })
    }

    onTabClicked = (indexValue) => {
        this.setState({ 
            index: indexValue, 
            renderView: false,
            currentFromDate: new Date(),
            fromDate: new Date().toISOString().substring(0, 10),
            toDate: new Date().toISOString().substring(0, 10),
            currentToDate: new Date()
        })
    }

    onLangChangeClick = () => {
        this.props.navigation.navigate('languageScreen')
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
                        label={Strings.documents}
                        onPressButton={() => this.onTabClicked(0)}
                    />
                    <View
                        style={{ width: 1, backgroundColor: 'white', height: '100%', margin: '0%' }}
                    />
                    <CustomButton
                        customViewStyle={{ margin: '0%', width: '50%', justifyContent: 'center' }}
                        customBtnStyle={{ height: 50 }}
                        customLabelStyle={index == 1 ? styles.activeTab : styles.inactiveTab}
                        label={Strings.feedback}
                        onPressButton={() => this.onTabClicked(1)}
                    />

                </View>
        
                <ScrollView contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', width, paddingBottom: '20%', paddingTop: '20%' }}>

                    <View style={{ paddingVertical: '2%'}}>
                        <Text 
                            style={{ fontSize: 16, textAlign: 'center', fontWeight: 'bold'}}
                        >
                            {index == 0 ? 'Document Filters' : 'Feedback Filters'}
                        </Text>
                    </View>

                    <CustomButton label={Strings.show_all} onPressButton={() => this.dateRange('all', index)} />
                    <CustomButton label={Strings.last_month} onPressButton={() => this.dateRange('lastMonth', index)} />
                    <CustomButton label={Strings.last_week} onPressButton={() => this.dateRange('lastWeek', index)} />
                    <CustomButton label={Strings.last_day} onPressButton={() => this.dateRange('lastDay', index)} />
                    <CustomButton label={Strings.custom_date} onPressButton={() => this.onClickCustom()} />

                    {
                        this.state.renderView ?
                            <View>
                                <DatePicker
                                    showDatepicker={() => this.showDatepicker('from')}
                                    textValue={this.state.fromDate}
                                    label={Strings.from}
                                />
                                <DateTimePicker
                                    isVisible={this.state.from}
                                    onConfirm={this.onFromDateChanged}
                                    onCancel={this.onCancelFrom}
                                    date={this.state.currentFromDate}
                                    maximumDate={new Date()}
                                    mode='date'
                                />
                                <DatePicker                                    
                                    showDatepicker={() => this.showDatepicker('to')}
                                    textValue={this.state.toDate}
                                    label={Strings.to}
                                />
                                <DateTimePicker
                                    isVisible={this.state.to}
                                    onConfirm={this.onToDateChanged}
                                    onCancel={this.onCancelTo}
                                    date={this.state.currentToDate}
                                    maximumDate={new Date()}
                                    minimumDate={this.state.minimumDate ? new Date(this.state.minimumDate) : new Date(1)}
                                    mode='date'
                                />
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <CustomButton label={Strings.submit} onPressButton={() => this.onClickSubmit()} />
                                </View>
                            </View>
                            : null
                    }
                </ScrollView>
                <TouchableOpacity 
                    style={{
                        position: 'absolute',
                        bottom: 23,
                        width: '100%',
                        height: 60,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#409DD6'
                    }}
                    onPress={this.onLangChangeClick}
                >
                    <Text style={{ 
                        color: 'white', 
                        textAlign: 'center',
                        fontSize: 16}}
                    >
                        {Strings.change_language}
                    </Text>
                </TouchableOpacity>
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
        color: '#d3e0d7',
        fontWeight: 'normal'
    }
}

export default FilterComponent;