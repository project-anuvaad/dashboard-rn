import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native'
import BarChartScreen from './BarChartScreen'
import PieChart from './PieChartScreen'
import StackedBarChart from './StackedBarChartScreen'
import Strings from '../../../utils/Strings'

const { height } = Dimensions.get('window')

class ChartScreenComponent extends Component {
  render() {
    const { xValueFormatter, getDocCountPerCourt, getUsersCountPerCourt, getSentenceCount, getwordCount, getTargetlanguages, getLanguagesByCourt, refs } = this.props
    return (
      <ScrollView 
        contentContainerStyle={{paddingBottom: '20%'}}
      >
        <View style={styles.slide}>
          <BarChartScreen
            title={Strings.document_translate}
            xValueFormatter={xValueFormatter}
            getDocCountPerCourt={getDocCountPerCourt}
            onClickCard={(data) => this.props.onClickCard(data)}
            label={Strings.count}
          />
        </View>
        <View style={styles.slide}>
          <BarChartScreen
            title={Strings.logged_in_user}
            xValueFormatter={xValueFormatter}
            getUsersCountPerCourt={getUsersCountPerCourt}
            onClickCard={(data) => this.props.onClickCard(data)}
            label={Strings.users}
          />
        </View>
        <View style={styles.slide}>
          <BarChartScreen
            title={Strings.sentence_count}
            xValueFormatter={xValueFormatter}
            getSentenceCount={getSentenceCount}
            onClickCard={(data) => this.props.onClickCard(data)}
            label={Strings.total_Sentence_count}
          />


        </View>
        <View style={styles.slide}>
          <BarChartScreen
            title={Strings.word_count}
            xValueFormatter={xValueFormatter}
            getwordCount={getwordCount}
            onClickCard={(data) => this.props.onClickCard(data)}
            label={Strings.total_word_count}
          />

        </View>
        <View style={styles.slide}>
          <PieChart
            title={Strings.translate_language_share}
            getTargetlanguages={getTargetlanguages}
          />
        </View>
        <View style={styles.slide}>
          <StackedBarChart
            title={Strings.language_by_court}
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