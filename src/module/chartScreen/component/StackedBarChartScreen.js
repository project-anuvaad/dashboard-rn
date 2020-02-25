import React from 'react';
import {
    StyleSheet,
    processColor,
    Dimensions
} from 'react-native';

import { BarChart, HorizontalBarChart } from 'react-native-charts-wrapper';
import { Card, Title } from 'react-native-paper';
import Strings from '../../../utils/Strings';

const stackLabels = [Strings.bengali_language, Strings.english_language, Strings.gujrati_language, Strings.hindi_language, Strings.malayalam_language, Strings.marathi_language, Strings.tamil_language, Strings.telugu_language, Strings.kannada_language, Strings.punjabi_language]
const { height, width } = Dimensions.get('window')
class StackedBarChartScreen extends React.Component {

    constructor() {
        super();

        this.state = {
            legend: {
                enabled: true,
                textSize: 14,
                form: "CIRCLE",
                horizontalAlignment: "CENTER",
                verticalAlignment: "BOTTOM",
                orientation: "HORIZONTAL",
                formSize: 8,
                xEntrySpace: 5,
                yEntrySpace: 2,
                wordWrapEnabled: true
            },
            data: {
                dataSets: [{
                    values: [],
                    label: '',
                    config: {
                        colors: [processColor('#C0FF8C'), processColor('#FFF78C'), processColor('#FFD08C'), processColor('#ff6666'),
                        processColor('#6e6eff'), processColor('#74c754'), processColor('violet'), processColor('pink'), processColor('orange'), processColor('grey')],
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
                // labelRotationAngle: 0,
                position: 'BOTTOM',
                drawGridLines: false,
                drawAxisLine: true,
                drawLabels: true,
                labelCount: 20,
                // axisMinimum: 5
            },
            yAxisLeft: {
                left: {
                    drawLabels: true,
                    drawAxisLine: true,
                    drawGridLines: false,
                },
                right: {
                    drawLabels: false,
                    drawAxisLine: false,
                    drawGridLines: false,
                    granularityEnabled: true,
                    granularity: 1,
                }
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
                }
            },
        };
    }

    componentDidMount() {
        const { xValueFormatter, getLanguagesByCourt } = this.props;

        if (xValueFormatter) {
            let newData = JSON.parse(JSON.stringify(this.state.xAxis))
            newData.valueFormatter = xValueFormatter

            this.setState({ xAxis: newData })
        }

        if (getLanguagesByCourt) {
            let newData = JSON.parse(JSON.stringify(this.state.data))
            newData.dataSets[0].values = getLanguagesByCourt
            this.setState({ data: newData })
        }
    }

    componentDidUpdate(prevProps) {

        if (prevProps != this.props) {
            const { xValueFormatter ,getLanguagesByCourt } = this.props;

            if (xValueFormatter && prevProps.xValueFormatter != xValueFormatter) {
                let newData = JSON.parse(JSON.stringify(this.state.xAxis))
                newData.valueFormatter = xValueFormatter

                this.setState({ xAxis: newData })
            }

            if (getLanguagesByCourt && prevProps.getLanguagesByCourt != getLanguagesByCourt) {
                let newData = JSON.parse(JSON.stringify(this.state.data))
                newData.dataSets[0].values = getLanguagesByCourt
                this.setState({ data: newData })
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
    }

    render() {
        return (
            <Card style={styles.container}>
                <Card.Content style={{ height: height * 0.9 }}>
                    <Title>{this.props.title}</Title>
                    {this.props.nothorizontal ?
                        <BarChart
                            style={styles.chart}
                            xAxis={this.state.xAxis}
                            yAxis={this.state.yAxisLeft}
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
                            scaleEnabled={false}
                            dragEnabled={false}
                            pinchZoom={false}
                            doubleTapToZoomEnabled={false}
                            drawBorders={false}
                            noDataText={Strings.no_data_available}
                        />
                        : <HorizontalBarChart
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
                            scaleEnabled={false}
                            dragEnabled={false}
                            pinchZoom={false}
                            doubleTapToZoomEnabled={false}
                            drawBorders={false}
                            noDataText={Strings.no_data_available}
                        />
                    }
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
        flex: 1
    }
});


export default StackedBarChartScreen;