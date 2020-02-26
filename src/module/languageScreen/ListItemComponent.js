import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'

export default class ListItemComponent extends Component {

  constructor(props) {
    super(props);

  }


  onSelect = (selectedLanguage , selectedLanguageCode) => {
    const {onItemSelected} = this.props;
    onItemSelected(selectedLanguage , selectedLanguageCode);
  }


  render() {
    const { item } = this.props;
    
    return (
      <TouchableOpacity style={{ 
        flex: 1, 
        flexDirection: "row", 
        padding: 10, 
        alignItems: "center",  
        backgroundColor: item.isSelected ? '#FBFBFF': 'white',
        borderBottomWidth: item.isSelected ? .5: 0,
        borderColor: item.isSelected ? '#B5C8E2' : 'transparent' 
      }}
        onPress={() => this.onSelect(item.name , item.code)}>
      <View style={{ marginStart: "5%" }}> 
      <Text style={{ color: 'black', fontSize: 18, fontWeight: item.isSelected ? "bold" : 'normal' }}>{item.name}</Text>
        <Text style={{ color: '#B1B1B1', fontSize: 14 }}>{item.englishName}</Text>
      
      </View> 
        {item.isSelected ?
          <Image 
          source={require('../../assets/images/checkColor-language.png')}
          style={{
            position: 'absolute',
            right: 30,
            alignItems: 'center',
            justifyContent: 'center',
            width: 25,
            height: 20
          }}
        />
        : null}

      </TouchableOpacity>
    )
  }
}
