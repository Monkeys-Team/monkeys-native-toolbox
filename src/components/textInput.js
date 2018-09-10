import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

import { WIDTH, Normalize } from '../helpers';

export class MTextInput extends Component {

  renderLeft = () => {
    const { leftIcon, leftIconStyle, leftIconOnPress } = this.props;
    return(
      <TouchableOpacity activeOpacity={0.9} onPress={leftIconOnPress} style={styles.iconContainer}>
        <Image source={leftIcon} style={[styles.icon, leftIconStyle]} />
      </TouchableOpacity>
    )
  }

  renderRight = () => {
    const { rightIcon, rightIconStyle, rightIconOnPress } = this.props;
    return(
      <TouchableOpacity activeOpacity={0.9} onPress={rightIconOnPress} style={styles.iconContainer}>
        <Image source={rightIcon} style={[styles.icon, rightIconStyle]} />
      </TouchableOpacity>
    )
  }

  render() {
    const { containerStyle, inputStyle, leftIcon, rightIcon } = this.props;
    return(
      <View style={[styles.container, containerStyle]}>
        {leftIcon && this.renderLeft()}
        <TextInput 
          {...this.props}
          style={[styles.input, inputStyle]}  />
        {rightIcon && this.renderRight()}
      </View>
      
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: WIDTH - 40,
    height: 50,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#bdc3c7'
  },
  input: {
    flex: 1,
    fontSize: Normalize(16),
    paddingHorizontal: 10,
    color: '#3d3d3d',
    borderRadius: 5,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginHorizontal: 10
  }
});
