import React, { Component } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

class CustomButton extends Component {

    render() {
        const { label } = this.props
        return (
            <View style={styles.viewStyle}>
                <TouchableOpacity
                    style={styles.btnStyle}
                    activeOpacity={.8}
                    onPress={() => this.props.onPressButton()}
                >
                    <Text style={styles.labelStyle}>
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
