import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';

import { IS_IPHONEX, Normalize, WIDTH } from '../helpers';
const MIN_WIDTH = WIDTH / 4;
const HEADER_HEIGHT = (IS_IPHONEX) ? 80 : 64;
const HEADER_PADDING_TOP = (IS_IPHONEX) ? 30 : 20;

export class Header extends Component {

  renderLeft = () => {
    const { leftIcon, leftIconStyle, leftText, leftTextStyle, leftOnPress, leftContainerStyle, renderLeft } = this.props;

    if(renderLeft){
      return(
        <View style={[styles.left, leftContainerStyle]}>
          {renderLeft()}
        </View>
      )
    }

    return(
      <TouchableOpacity style={[styles.left, leftContainerStyle]} onPress={leftOnPress}>
        {leftIcon && <Image source={leftIcon} style={[styles.leftIcon, leftIconStyle]} />}
        {leftText && <Text style={[styles.leftText, leftTextStyle]}>{leftText}</Text>}
      </TouchableOpacity>
    );
  }

  renderRight = () => {
    const { rightIcon, rightIconStyle, rightText, rightTextStyle, rightOnPress, rightContainerStyle, renderRight } = this.props;

    if(renderRight){
      return(
        <View style={[styles.right, rightContainerStyle]}>
          {renderRight()}
        </View>
      )
    }

    return(
      <TouchableOpacity style={[styles.right, rightContainerStyle]} onPress={rightOnPress}>
        {rightText && <Text style={[styles.rightText, rightTextStyle]}>{rightText}</Text>}
        {rightIcon && <Image source={rightIcon} style={[styles.rightIcon, rightIconStyle]} />}
      </TouchableOpacity>
    );
  }

  renderMiddle = () => {
    const { title, titleStyle, icon, iconStyle, middleContainerStyle, renderMiddle } = this.props;

    if(renderMiddle){
      return(
        <View style={[styles.middle, middleContainerStyle]}>
          {renderMiddle()}
        </View>
      ) 
    }

    return(
      <View style={[styles.middle, middleContainerStyle]}>
        {icon && <Image source={icon} style={[styles.icon, iconStyle]} />}
        {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
      </View>
    )
  }

  render() {
    return(
      <View style={styles.container}>
        {this.renderLeft()}
        {this.renderMiddle()}
        {this.renderRight()}
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    height: HEADER_HEIGHT,
    paddingTop: HEADER_PADDING_TOP,
    backgroundColor: 'white',
    shadowOpacity: 0.25,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 1
    },
    elevation: 2,
  },
  middle: {
    position: 'absolute',
    left: MIN_WIDTH,
    right: MIN_WIDTH,
    top: HEADER_PADDING_TOP, 
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: Normalize(16),
    fontWeight: '500',
    color: '#3d3d3d'
  },
  icon: {
    width: 80,
    height: 30,
    resizeMode: 'contain',
  },
  left: {
    position: 'absolute',
    left: 0,
    right: MIN_WIDTH * 3,
    top: HEADER_PADDING_TOP, 
    bottom: 0,
    flexDirection: 'row',
    paddingLeft: 10,
    alignItems: 'center',
  },
  leftText: {
    fontSize: Normalize(14),
    marginLeft: 5,
    color: '#3d3d3d'
  },
  leftIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    tintColor: '#3d3d3d'
  },
  right: {
    position: 'absolute',
    left: MIN_WIDTH * 3,
    right: 0,
    top: HEADER_PADDING_TOP, 
    bottom: 0,
    flexDirection: 'row',
    paddingRight: 10,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  rightText: {
    fontSize: Normalize(14),
    marginRight: 5,
    color: '#3d3d3d'
  },
  rightIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    tintColor: '#3d3d3d'
  }
});
