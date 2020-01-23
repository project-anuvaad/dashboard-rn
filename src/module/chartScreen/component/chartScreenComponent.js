import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native'
import BarChartScreen from './BarChartScreen'
import PieChart from './PieChartScreen'
import StackedBarChart from './StackedBarChartScreen'

const { height } = Dimensions.get('window')

class ChartScreenComponent extends Component {
  render() {
    const { xValueFormatter, getDocCountPerCourt, getUsersCountPerCourt, getSentenceCount, getwordCount, getTargetlanguages, getLanguagesByCourt } = this.props
    return (
      <View style={{ height }}>
        <ScrollView
          contentContainerStyle={{ backgroundColor: '#eee', paddingBottom: '20%' }}
        >
          <StackedBarChart
            title={'Languages By Court'}
            xValueFormatter={xValueFormatter}
            getLanguagesByCourt={getLanguagesByCourt}
          />

          <BarChartScreen
            title={'Documents Per Count'}
            xValueFormatter={xValueFormatter}
            getDocCountPerCourt={getDocCountPerCourt}
            onClickCard={(data) => this.props.onClickCard(data)}
            label={'Count'}
          />

          <BarChartScreen
            title={'Users Per Count'}
            xValueFormatter={xValueFormatter}
            getUsersCountPerCourt={getUsersCountPerCourt}
            onClickCard={(data) => this.props.onClickCard(data)}
            label={'Users'}
          />

          <BarChartScreen
            title={'Sentence Count'}
            xValueFormatter={xValueFormatter}
            getSentenceCount={getSentenceCount}
            onClickCard={(data) => this.props.onClickCard(data)}
            label={'Total Sentence Count'}
          />

          <BarChartScreen
            title={'Word Count'}
            xValueFormatter={xValueFormatter}
            getwordCount={getwordCount}
            onClickCard={(data) => this.props.onClickCard(data)}
            label={'Total Word Count'}
          />

          <PieChart 
          title={'Target Languages'}
          getTargetlanguages={getTargetlanguages} 
          />


        </ScrollView>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  text: {
    fontSize: 42,
  }
});
export default ChartScreenComponent