import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';

class Spinner extends Component{

    render(){
        const { animating } = this.props
        return(
            <ActivityIndicator
            animating = {animating}
            color = 'blue'
            size = "large"
            style = {[styles.activityIndicator, this.props.loaderStyle]}
          />
        )
    }
}

const styles = {
 
    activityIndicator: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      opacity: 0.5,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF88'
    },

  }; 

  export default Spinner
