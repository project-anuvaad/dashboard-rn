import React from 'react';
import {
    StyleSheet,
    processColor,
    Dimensions,
} from 'react-native';

import { HorizontalBarChart } from 'react-native-charts-wrapper';
import {  Card, Title } from 'react-native-paper';

const { height } = Dimensions.get('window')

class BarChartScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            legend: {
                enabled: true,
                textSize: 14,
                form: 'CIRCLE',
                horizontalAlignment: "RIGHT",
                // verticalAlignment: "BOTTOM",
                orientation: "HORIZONTAL",
                formSize: 14,
                xEntrySpace: 1,
                yEntrySpace: 5,
                formToTextSpace: 5,
                wordWrapEnabled: true,
                maxSizePercent: 10,
            },
            description: {
                text: ''
            },
            data: {
                dataSets: [{
                    values: [{ y: 0 }, { y: 0 }],
                    label: '',
                    config: {
                        color: processColor('blue'),
                        // barShadowColor: processColor('blue'),
                        highlightAlpha: 90,
                        // highlightColor: processColor('red'),
                    }
                }],

                config: {
                    barWidth: 0.65,
                }
            },
            highlights: [],
            xAxis: {
                valueFormatterPattern: 'string',
                valueFormatter: '',
                granularityEnabled: true,
                granularity: 1,
                // labelRotationAngle: -90,
                position: 'BOTTOM',
                drawGridLines: false,
                drawAxisLine: true,
                drawLabels: true,
                labelCount: 20,
            },
            yAxis: {
                left: {
                    drawLabels: false,
                    drawAxisLine: false,
                    drawGridLines: false,
                },
                right: {
                    drawLabels: true,
                    drawAxisLine: true,
                    drawGridLines: false,
                    granularityEnabled: true,
                    granularity: 1,
                    // labelRotationAngle: -90,
                    // axisMinimum: 0
                },
            },
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

    componentDidUpdate(prevProps) {


        if (prevProps != this.props) {
            const { xValueFormatter, getDocCountPerCourt, getUsersCountPerCourt, getSentenceCount, getwordCount ,label} = this.props;
            if (xValueFormatter && prevProps.xValueFormatter != xValueFormatter) {
                let newData = JSON.parse(JSON.stringify(this.state.xAxis))
                newData.valueFormatter = xValueFormatter

                this.setState({ xAxis: newData })
            }

            if (getDocCountPerCourt && prevProps.getDocCountPerCourt != getDocCountPerCourt) {
                let newData = JSON.parse(JSON.stringify(this.state.data))
                newData.dataSets[0].values = getDocCountPerCourt
                newData.dataSets[0].label = label
                newData.dataSets[0].config.color = processColor('#05E5CD')

                this.setState({ data: newData })
            }

            if (getUsersCountPerCourt && prevProps.getUsersCountPerCourt != getUsersCountPerCourt) {
                let newData = JSON.parse(JSON.stringify(this.state.data))
                newData.dataSets[0].values = getUsersCountPerCourt
                newData.dataSets[0].label = label
                newData.dataSets[0].config.color = processColor('#F54FF3')


                this.setState({ data: newData })
            }

            if (getSentenceCount && prevProps.getSentenceCount != getSentenceCount) {
                let newData = JSON.parse(JSON.stringify(this.state.data))
                newData.dataSets[0].values = getSentenceCount
                newData.dataSets[0].label = label
                newData.dataSets[0].config.color = processColor('#F7B61F')

                this.setState({ data: newData })
            }

            if (getwordCount && prevProps.getwordCount != getwordCount) {
                let newData = JSON.parse(JSON.stringify(this.state.data))
                newData.dataSets[0].values = getwordCount
                newData.dataSets[0].label = label
                newData.dataSets[0].config.color = processColor('#A4F850')

                this.setState({ data: newData })
            }

        }
    }

    render() {
        const { title } = this.props
        return (
            <Card style={styles.container} onPress={() => this.props.onClickCard(this.state)}>
                <Card.Content style={{ height: height * 0.9 }}>
                    <Title>{title}</Title>
                    <HorizontalBarChart
                        style={styles.chart}
                        data={this.state.data}
                        xAxis={this.state.xAxis}
                        yAxis={this.state.yAxis}
                        animation={{ durationX: 1000 }}
                        legend={this.state.legend}
                        gridBackgroundColor={processColor('#ffffff')}
                        // visibleRange={{ x: { min: 20, max: 20 } }}
                        drawBarShadow={false}
                        drawValueAboveBar={true}
                        drawHighlightArrow={false}
                        chartDescription={this.state.description}
                        onSelect={this.handleSelect.bind(this)}
                        // highlights={this.state.highlights}
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
        height: height * 0.9,
        backgroundColor: '#ffff',
        borderWidth: 1,
        borderColor: 'lightgrey',
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
        flex: 1,
        margin: 8,
        marginTop: 0
    },
    card: {
        shadowColor: 'rgba(0, 0, 0, 0.12)',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 2,
        },
    }
});

export default BarChartScreen;