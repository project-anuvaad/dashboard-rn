import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

class DatePicker extends Component {

    render() {
        const { value ,showPicker,textValue,label} = this.props
        return (
            <View style={[styles.dateTimeContainer, { paddingLeft: '2%', justifyContent: "center", borderBottomColor: '#1976D2', marginStart: '10%', marginEnd: '10%' }]}>

                <TouchableOpacity onPress={() => this.props.showDatepicker()} style={{ flexDirection: "row" }}>
                    <Text style={{ flex: 3, fontSize: 20, color: '#1976D2', fontWeight: "bold", textAlign: 'left' }}>{`${label} :`}</Text>
                    <Text style={{ flex: 6, fontSize: 20, color: '#000', fontWeight: "bold", textAlign: 'left' }}>{textValue}</Text>
                </TouchableOpacity>
                { showPicker &&
                    <DateTimePicker
                    value={value}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={(event, date) => this.props.setDate(event, date)} />
                }
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
        borderBottomColor: '#1976D2',
        height: 50,
        // backgroundColor: '#fff'
    },
}

export default DatePicker
