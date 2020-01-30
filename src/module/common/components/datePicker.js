import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import DateTimePicker from 'react-native-modal-datetime-picker'

class DatePicker extends Component {

    render() {
        const { value ,showPicker, showPickerFrom, showPickerTo, textValue,label, showDatepicker, onConfirmFrom, onConfirmTo, onCancelFrom, onCancelTo} = this.props
        return (
            <View style={[styles.dateTimeContainer, { paddingLeft: '2%', justifyContent: "center", borderBottomColor: '#409DD6', marginStart: '10%', marginEnd: '10%' }]}>

                <TouchableOpacity onPress={showDatepicker} style={{ flexDirection: "row" }}>
                    <Text style={{ flex: 3, fontSize: 20, color: '#409DD6', fontWeight: "bold", textAlign: 'left' }}>{`${label} :`}</Text>
                    <Text style={{ flex: 6, fontSize: 20, color: '#000', fontWeight: "bold", textAlign: 'left' }}>{textValue}</Text>
                </TouchableOpacity>
                {/* { showPicker &&
                    <DateTimePicker
                    value={value}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={(event, date) => this.props.setDate(event, date)} />
                } */}
                {/* {showPickerFrom &&
                <DateTimePicker
                    isVisible={showPickerFrom}
                    onConfirm={onConfirmFrom}
                    onCancel={onCancelFrom}
                    maximumDate={new Date()}
                    mode='date'
                />}
                {showPickerTo &&
                <DateTimePicker
                    isVisible={showPickerTo}
                    onConfirm={onConfirmTo}
                    onCancel={onCancelTo}
                    maximumDate={new Date()}
                    mode='date'
                />} */}
            </View>
        )
    }
}

const styles = {
    dateTimeContainer: {
        flexDirection: 'row',
        alignItems: "center",
        borderBottomWidth: 1,
        borderRadius: 2,
        borderBottomColor: '#409DD6',
        height: 50,
        // backgroundColor: '#fff'
    },
}

export default DatePicker
