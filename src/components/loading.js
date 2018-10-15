import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  ActivityIndicator,
  Text
} from 'react-native';

import { WIDTH,Normalize } from '../helpers';

export class Loading extends Component {

  static defaultProps = {
    size: 'large',
    color: 'white'
  }

  renderWithBackground = () => {
    const { image, size, color, containerStyle, imageStyle, text, textStyle } = this.props;
    return(
      <ImageBackground 
        source={image} 
        style={[styles.imageContainer, containerStyle]}
        imageStyle={[styles.image, imageStyle]}
      >
        <View style={styles.overlay} />
        <Text style={[styles.backgroundText, textStyle]}>
          { text }
        </Text>
        <ActivityIndicator size={size} color={color} />
      </ImageBackground>
    )
  }

  render() {
    const { image, size, color, containerStyle, isLoading } = this.props;

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
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  image: {
    flex: 1,
    width: WIDTH,
    resizeMode: 'cover',
  },
  backgroundText: {
    alignSelf:'center',
    fontSize: Normalize(16),
    color:'black'
  }
});
