import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Strings from '../../../utils/Strings';


class HeaderComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const {
            backButton,
            backClick,
            title,
            onLangClick
        } = this.props
        return (
            <View style={[styles.mainHeaderContainerStyle, {height: backButton ? 60 : 75}]}>
                {backButton ? 
                <TouchableOpacity 
                    style={styles.hamburgerBtnStyle}
                    onPress={backClick}
                >
                    <Image 
                        source={require('../../../assets/images/back3.png')}
                        style={styles.hamburgerImageStyle}
                        resizeMode='contain'
                    />
                </TouchableOpacity> : null }
                {!backButton ?
                <View style={{
                    height: '80%',
                    width: '100%',
                }}> 
                    <View style={{
                        flexDirection: 'row',
                        height: '60%',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Image 
                            source={require('../../../assets/images/logo.png')}
                            style={{ width: 40, height: 50}}
                            resizeMode={'contain'}
                        />
                        <Text
                            style={[styles.headerTitleTextStyle, { width: 'auto', paddingHorizontal: '2%'}]}
                        >{title}</Text>
                    </View>
                    <Text
                            style={[styles.headerTitleTextStyle, { paddingVertical: '2.5%', fontSize: 13}]}
                        >{Strings.suvas_full_text}</Text> 
                </View> :

                <Text style={[styles.headerTitleTextStyle, {
                    // width: !backButton ? '100%' : '80%'
                    textAlign: 'left'
                }]}>{title}</Text> }
                {!backButton && 
                <TouchableOpacity 
                    style={styles.languageBtnStyle}
                    onPress={onLangClick}
                >
                    {/* <Text style={{ color: 'white'}}>HI</Text> */}
                    <Image 
                        style={{ width: 30, height: 40}}
                        source={require('../../../assets/images/language.png')}
                        resizeMode={'contain'}
                    />
                </TouchableOpacity>}
            </View>
        );
    }
}

const styles = {
    mainHeaderContainerStyle: {
        height: 60, 
        backgroundColor: '#409DD6',
        flexDirection: 'row',
        alignItems: 'center',  

        zIndex:100
    },
    hamburgerBtnStyle: {
        paddingHorizontal: '5%',
        width: '18%',
        height: '60%',
        // alignItems: 'center',
        // justifyContent: 'center',
        // backgroundColor: 'red'
    },
    hamburgerImageStyle: {
        width: '80%',
        height: '100%',
    },
    headerTitleTextStyle: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        width: '100%',
        fontWeight: '500'
        // padding: '2%',
        // marginStart: '5%'
    },
    languageBtnStyle: {
        position: 'absolute', 
        right: 10, 
        borderWidth: 1, 
        borderColor: 'white',
        borderRadius: 15, 
        width: 30, 
        height: 30, 
        alignItems: 'center', 
        justifyContent: 'center'
    }
}
export default HeaderComponent;