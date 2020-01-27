import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

class CustomButton extends Component {

    render() {
        const { label } = this.props
        return (
            <Button
                style={styles.btnStyle}
                mode="contained"
                onPress={()=>this.props.onPressButton()}
            >
                {label}
            </Button>
        )
    }
}

const styles = {
    btnStyle: {
        width: '50%',
        paddingVertical: 10,
        margin: '2%',
        backgroundColor: '#409DD6'
    },

};

export default CustomButton
