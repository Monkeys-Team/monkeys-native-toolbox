import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  ActivityIndicator
} from 'react-native';

import { WIDTH } from '../helpers';

export class Loading extends Component {

  static defaultProps = {
    size: 'large',
    color: 'white'
  }

  renderWithBackground = () => {
    const { image, size, color, containerStyle, imageStyle } = this.props;
    return(
      <ImageBackground 
        source={image} 
        style={[styles.container, containerStyle]}
        imageStyle={[styles.image, imageStyle]}
      >
        <ActivityIndicator size={size} color={color} />
      </ImageBackground>
    )
  }

  render() {
    const { image, size, color, containerStyle } = this.props;

    if(image){
      return this.renderWithBackground()
    }

    return(
      <View style={[styles.container, containerStyle]}>
        <ActivityIndicator size={size} color={color} />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  image: {
    flex: 1,
    width: WIDTH,
    resizeMode: 'cover',
  }
});
