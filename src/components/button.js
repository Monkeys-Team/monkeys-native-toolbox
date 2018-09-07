import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Image
} from 'react-native';

import { Statics } from '../helpers';

export default class Button extends Component {

  static defaultProps = {
    activeOpacity: 0.9
  }

  render() {
    const { children, containerStyle, textStyle, rightIcon, rightIconStyle, leftIcon, leftIconStyle } = this.props;
    return(
      <TouchableOpacity {...this.props} style={[styles.container, containerStyle]}>
        {leftIcon && <Image source={leftIcon} style={[styles.icon, styles.left, leftIconStyle]} />}
        {children && <Text style={[styles.text, textStyle]}>{children}</Text>}
        {rightIcon && <Image source={rightIcon} style={[styles.icon, styles.right, rightIconStyle]} />}
      </TouchableOpacity>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3d3d3d',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    width: Statics.WIDTH - 40,
    height: 50,
  },
  text: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold'
  },
  icon: {
    position: 'absolute',
    width: 35,
    height: 35,
    resizeMode: 'contain'
  },
  left: {
    left: 20
  },
  right: {
    right: 20
  }
});
