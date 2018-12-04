import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';

export class Avatar extends Component {
  render() {
    const { source, label, size, onPress, containerStyle, imageStyle, buttonProps, imageProps } = this.props; 
    const avatarSize = size-2
    const resizeContainer = size ? {width: size, height: size, borderRadius: size/2} : {};
    const resizeAvatar = size ? {width: avatarSize, height: avatarSize, borderRadius: avatarSize/2} : {};

    let child;
    if(source.uri){
      child = <Image {...imageProps} source={source} style={[styles.avatar, resizeAvatar, imageStyle]} />;
    }else{
      child = (
        <View style={ styles.labelContainer }>
          <Text style={ styles.label }>
            {label || 'User'}
          </Text>
        </View>
      )
    }


    return(
      <TouchableOpacity {...buttonProps} onPress={onPress} style={[styles.container, resizeContainer, containerStyle]}>
        {child}
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
  },
  labelContainer:{
    backgroundColor:'#F7F7F7',
    borderColor:'#CECECE',
    width: 60,
    justifyContent:'center',
    alignItems:'center',
    height: 60,
    borderRadius: 30,
    borderWidth:1,
  },
  label:{
    color:'#CECECE',
    fontSize:13,
    fontWeight:'bold'
  }
});
