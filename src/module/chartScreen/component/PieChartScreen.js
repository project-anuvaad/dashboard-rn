import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    processColor,
} from 'react-native';

import { StackNavigator, SafeAreaView } from 'react-navigation';

import { PieChart } from 'react-native-charts-wrapper';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

class PieChartScreen extends React.Component {

    constructor() {
        super();

        this.state = {
            legend: {
                enabled: true,
                textSize: 15,
                form: 'CIRCLE',
                horizontalAlignment: "CENTER",
                verticalAlignment: "BOTTOM",
                orientation: "HORIZONTAL",
                wordWrapEnabled: true
            },
            data: {
                dataSets: [{
                    values: [],
                    label: '',
                    config: {
                        colors: [processColor('#C0FF8C'), processColor('#FFF78C'), processColor('#FFD08C'), processColor('red'),
                        processColor('blue'), processColor('green'), processColor('violet'), processColor('pink'), processColor('orange'), processColor('grey')],
                        valueTextSize: 9,
                        valueTextColor: processColor('green'),
                        sliceSpace: 3,
                        selectionShift: 5,
                        // xValuePosition: "OUTSIDE_SLICE",
                        yValuePosition: "OUTSIDE_SLICE",
                        valueFormatter: "#.#'%'",
                        valueLineColor: processColor('green'),
                        valueLinePart1Length: 0.5
                    }
                }],
            },
            highlights: [{ x: 2 }],
            description: {
                text: '',
                textSize: 15,
                textColor: processColor('darkgray'),

            }
        };
    }

    handleSelect(event) {
        let entry = event.nativeEvent
        if (entry == null) {
            this.setState({ ...this.state, selectedEntry: null })
        } else {
            this.setState({ ...this.state, selectedEntry: JSON.stringify(entry) })
        }

        console.log(event.nativeEvent)
    }

    componentDidUpdate(prevProps){
        if (prevProps != this.props) {
            const { getTargetlanguages } = this.props;
            if (getTargetlanguages && prevProps.getTargetlanguages != getTargetlanguages) {
                let newData = JSON.parse(JSON.stringify(this.state.data))
                newData.dataSets[0].values = getTargetlanguages
                this.setState({ data: newData })
            }
        }
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Card style={styles.container}>
                    <Card.Content style={{ height: '100%' }}>
                        <Title>{'Target Languages'}</Title>
                        <PieChart
                            style={styles.chart}
                            logEnabled={true}
                            chartBackgroundColor={processColor('#fff')}
                            chartDescription={this.state.description}
                            data={this.state.data}
                            legend={this.state.legend}
                            // highlights={this.state.highlights}

                            entryLabelColor={processColor('green')}
                            entryLabelTextSize={10}
                            drawEntryLabels={false}

                            rotationEnabled={false}
                            rotationAngle={60}
                            usePercentValues={true}
                            styledCenterText={{ text: '', color: processColor('pink'), size: 20 }}
                            centerTextRadiusPercent={10}
                            holeRadius={60}
                            holeColor={processColor('#fff')}
                            transparentCircleRadius={45}
                            transparentCircleColor={processColor('#f0f0f088')}
                            maxAngle={360}
                            onSelect={this.handleSelect.bind(this)}
                            onChange={(event) => console.log(event.nativeEvent)}
                        />
                    </Card.Content>
                </Card>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        height: 400,
        backgroundColor: '#ffff',
        borderWidth: 1,
        borderColor: 'grey',
        margin: '2%',
        shadowColor: 'rgba(0, 0, 0, 0.12)',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 2,
        },
    },
    chart: {
        flex: .95
    }
});

export default PieChartScreen;
