import React, { Component } from 'react'
import { View, Dimensions, ImageBackground } from 'react-native'
import Spinner from '../common/components/loadingIndicator';

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
        <View style={{ height, width }}>
                <ImageBackground
                    source={require('../../assets/images/screen.png')}
                    style={{ height, width }}
                    resizeMode="cover"
                >         
                    {isLoading && <Spinner animating={isLoading} loaderStyle={{top: 0, backgroundColor: 'transparent'}} /> }      
  
                </ImageBackground>            
        </View>
        )
    }
}

export default SplashContainer;
