import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View, processColor
} from 'react-native';

import { BarChart } from 'react-native-charts-wrapper';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

const stackLabels = ['Bengali', 'English', 'Gujarati', 'Hindi', 'Malayalam', 'Marathi', 'Tamil', 'Telugu', 'kannada', 'punjabi']

class StackedBarChartScreen extends React.Component {

    constructor() {
        super();

        this.state = {
            legend: {
                enabled: true,
                textSize: 14,
                form: "CIRCLE",
                // horizontalAlignment: "RIGHT",
                // verticalAlignment: "CENTER",
                // orientation: "VERTICAL",
                formSize: 8,
                xEntrySpace: 5,
                yEntrySpace: 5,
                wordWrapEnabled: true
            },
            data: {
                dataSets: [{
                    values: [{ y: [40, 30, 20, 10, 0, 0, 0, 0, 0, 0] }, { y: [10, 0, 10, 10] }, { y: [30, 20, 50, 0] }, { y: [0, 30, 50, 10] }],
                    label: '',
                    config: {
                        colors: [processColor('#C0FF8C'), processColor('#FFF78C'), processColor('#FFD08C'), processColor('red'),
                        processColor('blue'), processColor('green'), processColor('violet'), processColor('pink'), processColor('orange'), processColor('grey')],
                        stackLabels: stackLabels
                    }
                }],
            },
            highlights: [{ x: 1, stackIndex: 2 }, { x: 2, stackIndex: 1 }],
            description: {
                text: ''
            },
            xAxis: {
                valueFormatter: [],
                granularityEnabled: true,   
                granularity: 1,
                granularityEnabled: true,
                granularity: 1,
                labelRotationAngle: -90,
                position: 'BOTTOM',
                drawGridLines: false,
                drawAxisLine: true,
                drawLabels: true,
            },
            yAxis: {
                left: {
                    drawLabels: true,
                    drawAxisLine: true,
                    drawGridLines: false,
                },
                right: {
                    drawLabels: false,
                    drawAxisLine: false,
                    drawGridLines: false,
                },
            },

        };
    }

    componentDidUpdate(prevProps) {

        // console.log('prevProps', prevProps, ': : this.props', this.props)

        if (prevProps != this.props) {
            const { xValueFormatter } = this.props;
            if (xValueFormatter && prevProps.xValueFormatter != xValueFormatter) {
                let newData = JSON.parse(JSON.stringify(this.state.xAxis))
                newData.valueFormatter = xValueFormatter

                this.setState({ xAxis: newData })
            }
        }
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

    render() {
        return (
            <Card style={styles.container}>
                <Card.Content style={{ height: '100%' }}>
                    <Title>{'Languages By Court'}</Title>
                    <BarChart
                        style={styles.chart}
                        xAxis={this.state.xAxis}
                        yAxis={this.state.yAxis}
                        animation={{ durationX: 1000 }}
                        gridBackgroundColor={processColor('#ffffff')}
                        data={this.state.data}
                        legend={this.state.legend}
                        drawBarShadow={false}
                        drawValueAboveBar={true}
                        drawHighlightArrow={false}
                        chartDescription={this.state.description}
                        // marker={{
                        //     enabled: true,
                        //     markerColor: processColor('#F0C0FF8C'),
                        //     textColor: processColor('white'),
                        //     markerFontSize: 14,
                        // }}
                        highlights={this.state.highlights}
                        onSelect={this.handleSelect.bind(this)}
                        onChange={(event) => console.log(event.nativeEvent)}
                        drawValueAboveBar
                        scaleEnabled={false}
                        dragEnabled={false}
                        pinchZoom={false}
                        doubleTapToZoomEnabled={false}
                        drawBorders={false}
                        noDataText="Opps... no data available!"
                    />
                </Card.Content>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 450,
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
        flex: 1
    }
});


export default StackedBarChartScreen;