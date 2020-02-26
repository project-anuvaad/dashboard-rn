import React, { Component } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

class CustomButton extends Component {

    render() {
        const { label, customViewStyle, customBtnStyle, customLabelStyle } = this.props
        return (
            <View style={[styles.viewStyle, customViewStyle]}>
                <TouchableOpacity
                    style={[styles.btnStyle, customBtnStyle]}
                    activeOpacity={.8}
                    onPress={() => this.props.onPressButton()}
                >
                    <Text style={[styles.labelStyle, customLabelStyle]}>
                        {label}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = {
    viewStyle: {
        margin: '2%',
        width: '50%'
    },
    btnStyle: {
        width: '100%',
        height: 50,
        paddingVertical: 13,
        borderRadius: 8,
        // margin: '2%',
        backgroundColor: '#409DD6'
    },
    labelStyle: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 16
    }
};

export default CustomButton
