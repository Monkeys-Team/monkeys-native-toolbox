import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';

export class Avatar extends Component {
  render() {
    const { source, size, onPress, containerStyle, imageStyle, buttonProps, imageProps } = this.props; 
    const avatarSize = size-2
    const resizeContainer = size ? {width: size, height: size, borderRadius: size/2} : {};
    const resizeAvatar = size ? {width: avatarSize, height: avatarSize, borderRadius: avatarSize/2} : {};

    return(
      <TouchableOpacity {...buttonProps} onPress={onPress} style={[styles.container, resizeContainer, containerStyle]}>
        <Image {...imageProps} source={source} style={[styles.avatar, resizeAvatar, imageStyle]} />
      </TouchableOpacity>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29
  }
});
