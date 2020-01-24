import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import {  Button } from 'react-native-paper';

const { height, width } = Dimensions.get('window')

class FilterComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
        }
    }

    render() {
        return(
            <View style={{ height: height-60}}>
                <View style={{ justifyContent: 'center', alignItems: 'center', width, height: '100%'}}>
                    <Button 
                        style={styles.btnStyle}
                        mode="contained" 
                        onPress={this.props.lastMonthClick}
                    >
                        Last Month
                    </Button>
                    <Button 
                        style={styles.btnStyle}
                        mode="contained" 
                        onPress={() => console.log('Pressed')}
                    >
                        Last Week
                    </Button>
                    <Button 
                        style={styles.btnStyle}
                        mode="contained" 
                        onPress={() => console.log('Pressed')}
                    >
                        Last Day
                    </Button>
                </View>
            </View>
        );
    }
}

const styles = {
    btnStyle : {
        width: '50%', 
        paddingVertical: 10, 
        margin: '2%', 
        backgroundColor: '#1976D2'
    }
}
export default FilterComponent;