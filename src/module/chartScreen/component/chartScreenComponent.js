import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native'
import BarChartScreen from './BarChartScreen'
import PieChart from './PieChartScreen'
import StackedBarChart from './StackedBarChartScreen'

const { height } = Dimensions.get('window')

class ChartScreenComponent extends Component {
  render() {
    const { xValueFormatter, getDocCountPerCourt, getUsersCountPerCourt, getSentenceCount, getwordCount, getTargetlanguages, getLanguagesByCourt, refs } = this.props
    return (
      <ScrollView 
        contentContainerStyle={{paddingBottom: '10%'}}
      >
        <View style={styles.slide}>
          <BarChartScreen
            title={'Documents Translated'}
            xValueFormatter={xValueFormatter}
            getDocCountPerCourt={getDocCountPerCourt}
            onClickCard={(data) => this.props.onClickCard(data)}
            label={'Count'}
          />
        </View>
        <View style={styles.slide}>
          <BarChartScreen
            title={'Logged in User'}
            xValueFormatter={xValueFormatter}
            getUsersCountPerCourt={getUsersCountPerCourt}
            onClickCard={(data) => this.props.onClickCard(data)}
            label={'Users'}
          />
        </View>
        <View style={styles.slide}>
          <BarChartScreen
            title={'Sentence Count'}
            xValueFormatter={xValueFormatter}
            getSentenceCount={getSentenceCount}
            onClickCard={(data) => this.props.onClickCard(data)}
            label={'Total Sentence Count'}
          />


        </View>
        <View style={styles.slide}>
          <BarChartScreen
            title={'Word Count'}
            xValueFormatter={xValueFormatter}
            getwordCount={getwordCount}
            onClickCard={(data) => this.props.onClickCard(data)}
            label={'Total Word Count'}
          />

        </View>
        <View style={styles.slide}>
          <PieChart
            title={'Translated Language Share'}
            getTargetlanguages={getTargetlanguages}
          />
        </View>
        <View style={styles.slide}>
          <StackedBarChart
            title={'Languages By Court'}
            xValueFormatter={xValueFormatter}
            getLanguagesByCourt={getLanguagesByCourt}
          />
        </View>
      </ScrollView>

    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  text: {
    fontSize: 42,
  },
  wrapper: {
    backgroundColor: '#FFF',
  },
  slide: {
  },
});
export default ChartScreenComponent