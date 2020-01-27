import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native'
import BarChartScreen from './BarChartScreen'
import PieChart from './PieChartScreen'
import StackedBarChart from './StackedBarChartScreen'
import Swiper from 'react-native-swiper'

const { height } = Dimensions.get('window')

class ChartScreenComponent extends Component {
  render() {
    const { xValueFormatter, getDocCountPerCourt, getUsersCountPerCourt, getSentenceCount, getwordCount, getTargetlanguages, getLanguagesByCourt, refs } = this.props
    return (
      // <Swiper style={[styles.wrapper, { height: height }]}
      //   showsButtons={false} orientation={'vertical'}
      //   dotStyle={{ opacity: 0 }}
      //   activeDotStyle={{ opacity: 0 }}
      //   loop={false}
      // >
      <ScrollView>
        <View style={styles.slide}>
          <BarChartScreen
            title={'Documents Per Court'}
            xValueFormatter={xValueFormatter}
            getDocCountPerCourt={getDocCountPerCourt}
            onClickCard={(data) => this.props.onClickCard(data)}
            label={'Count'}
          />
        </View>
        <View style={styles.slide}>
          <BarChartScreen
            title={'Users Per Court'}
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
            title={'Target Languages'}
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
      // </Swiper>

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