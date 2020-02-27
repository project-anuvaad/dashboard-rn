import React, { Component } from 'react'
import { Text, View, Platform, TouchableOpacity, FlatList, Dimensions } from 'react-native'
import ListItem from './ListItemComponent';
import { languages } from '../../utils/Languages';
import Strings from '../../utils/Strings';
import { setAppLanguage, getAppLanguage } from '../../utils/StorageUtils';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {setLanguage} from '../../flux/actions/languageAction'
import HeaderComponent from '../common/components/HeaderComponent';

const { height, width } = Dimensions.get('window')
class LanguageListComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      appLanguages: languages,
      isItemSelected: false,
      prevLangCode: 'en',
      prevLanguage: 'English',
      langCode: 'en',
      langSelected: 'English'
    }

  }
  componentDidMount = async() => {
    const { appLanguages } = this.state;
    let appLanguage = await getAppLanguage();
    let langCode= 'en' 
    let prevLangSelected= 'English'
  if(appLanguage !== null) {
    langCode = appLanguage.code 
    prevLangSelected = appLanguage.language
  }
    let newArray = appLanguages;
    newArray.map((item) => item.code == langCode ? item.isSelected = true : item.isSelected = false);
    this.setState({
      appLanguages: newArray,
      prevLangCode: langCode,
      prevLanguage: prevLangSelected
    });
  }
  onItemClick = (selectedLanguage, languageCode) => {

    const { appLanguages } = this.state;
   
   
      // Strings.setLanguage(languageCode);
      let newArray = appLanguages;
      newArray.map((item) => item.name == selectedLanguage ? item.isSelected = true : item.isSelected = false);
      this.setState({
        appLanguages: newArray,
        isItemSelected: true,
        langCode: languageCode,
        langSelected: selectedLanguage,
      })  
  
  }


  _renderItem = ({ item }) => {
    return (
      <ListItem item={item} onItemSelected={this.onItemClick} />
    );
  }


  _renderItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: '#DEDEDE',
        }}
      />
    );
  };

  onOkClick = async() => {
    const { langCode, langSelected } = this.state
    if(this.state.isItemSelected) {
      Strings.setLanguage(langCode);
      let data = {
        name: langSelected,
        code: langCode
      }
      this.props.setLanguage(data)
      await setAppLanguage(langCode, langSelected);      
    }
    // this.setState({})
    this.props.navigation.pop(1)
  }

  onBackClick = () => {
    this.props.navigation.pop(1)
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <HeaderComponent title={Strings.change_language} backButton={true} backClick={this.onBackClick}/>
        <View style={{ flex: 5}}>
          <FlatList
            data={this.state.appLanguages}
            renderItem={this._renderItem}
            ItemSeparatorComponent={this._renderItemSeparator}
            extraData={this.state}
            keyExtractor={(index) => index}
          />
        </View>
        <TouchableOpacity
          onPress={this.onOkClick} //this.props.navigation.pop(1)
          style={this.state.isItemSelected ? styleInline.btnActiveStyle : styleInline.btnInactiveStyle}
        >
          <Text
            style=
            {[this.state.isItemSelected ? {color: '#FFFFFF', fontSize: 18} : {color: '#95989A', fontSize: 14},
            {
              textAlign: 'center',fontWeight:"bold"
            }
            ]}
          >{Strings.done}</Text>
        </TouchableOpacity>
       
      </View>
    )
  }
}

const styleInline = {
  btnActiveStyle: {
    backgroundColor: '#409DD6',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    width,
    elevation: 5,
  },
  btnInactiveStyle: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    elevation: 5,
    width,
  }
}

const mapStateToProps = (state) => {
  return {
      apiStatus: state.apiStatus,
      getChartData: state.getChartData,
      getChartDataCount: state.getChartDataCount,
      getFeedbackDataCount: state.getFeedbackDataCount,
      getFeedbackData: state.getFeedbackData
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setLanguage: setLanguage
  }, dispatch)
}

export default (connect(mapStateToProps, mapDispatchToProps)(LanguageListComponent))
