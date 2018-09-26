import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
  Text
} from 'react-native';

import { Normalize, WIDTH } from '../helpers';
const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity);

export class Switch extends Component {

  static defaultProps = {
    value: false,
    circleColor: '#FAFAFA',
    offColor: 'rgba(216, 216, 216, 1.0)',
    onColor: 'rgba(46, 204, 113,1.0)',
  }

  constructor(props) {
    super(props)
  
    this.state = {
      value: props.value,
      position: new Animated.ValueXY({x: 0, y: 0}),
    }
  }

  changeValue = () => {
    const { onValueChange } = this.props;
    const { value, position } = this.state;
    onValueChange(!value);
    this.setState({value: !value});
    const animConfig = value ? { x: 0, y: 0} : {x: 25, y: 0};
    Animated.timing(position, {
      toValue: animConfig,
      duration: 250
    }).start();
  }

  getAnimatedStyle = () => {
    const { position } = this.state;
    return {transform: position.getTranslateTransform()};
  }

  getAnimatedBackgroundColor = () => {
    const { offColor, onColor } = this.props;
    const { position } = this.state;
    const bgColor = position.x.interpolate({
      inputRange: [0, 25],
      outputRange: [offColor, onColor]
    })
    return {backgroundColor: bgColor};
  }

  render() {
    const { circleColor, circleStyle, containerStyle, switchContainerStyle, label, labelStyle } = this.props;
    return(
      <View style={[styles.container, containerStyle]}>
        <Text style={[styles.label, labelStyle]}>
          {label}
        </Text>
        <AnimatedButton 
          onPress={this.changeValue} 
          style={[styles.switchContainer, switchContainerStyle, this.getAnimatedBackgroundColor()]}>
        <Animated.View 
          style={[styles.toggleCircle, {backgroundColor: circleColor}, this.getAnimatedStyle(), circleStyle]} />
      </AnimatedButton>
      </View>
      
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    width: WIDTH - 40,
    height: 50,
  },
  switchContainer: {
    justifyContent: 'center',
    width: 55,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 10
  },
  toggleCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    shadowOpacity: 0.30,
    shadowColor: '#3d3d3d',
    shadowOffset: {
      width: 0,
      height: 1
    },
    elevation: 2,
  },
  label: {
    flex: 1,
    fontSize: Normalize(14),
    color: '#3d3d3d',
    marginHorizontal: 10
  }
});
