import React, { Component } from 'react'
import { View, Dimensions, ImageBackground, Text } from 'react-native'
import Spinner from '../common/components/loadingIndicator';
import Strings from '../../utils/Strings';

const { height, width } = Dimensions.get('window')
class SplashContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                isLoading: false
            }, () => {
                this.props.navigation.navigate('dashboardMain')
            })
        }, 3000);
    }
    
    render() {
        const { isLoading } = this.state
        return(
        <View style={{ height, width, backgroundColor: 'white' }}>
                <ImageBackground
                    source={require('../../assets/images/splash.png')}
                    style={{ height, width }}
                    resizeMode="contain"
                >         
                 <View 
                    style={{
                        width: '100%',
                        height: 30,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: height * .8,
                    }}
                >
                    <Text style={{ 
                        color: 'black', 
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: 18}}
                    >
                        {Strings.suvas_full_text}
                    </Text>
                </View>
                    {isLoading && <Spinner animating={isLoading} loaderStyle={{top: 0, backgroundColor: 'transparent'}} /> }      
  
                </ImageBackground>            
        </View>
        )
    }
}

export default SplashContainer;
