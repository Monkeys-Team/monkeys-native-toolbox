import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';

import { WIDTH, Normalize } from '../helpers';

export class ButtonGroup extends Component {

  static defaultProps = {
    selectedIndex: -1
  }

  constructor(props) {
    super(props)

    this.state = {
      selectedIndex: props.selectedIndex,
    }
  }

  onSelectedChange = (selectedIndex) => {
    if(this.state.selectedIndex !== selectedIndex){
      const { buttons, onSelectedChange } = this.props;
      this.setState({ selectedIndex });
      if(onSelectedChange){
        onSelectedChange({ selectedIndex, selectedValue: buttons[selectedIndex] })
      }else{
        console.warn('onSelectedChange is not provided!');
      }
    }
  }

  renderButtons = () => {
    const { buttons, selectedButtonStyle, selectedTextStyle, buttonStyle, textStyle } = this.props;
    const { selectedIndex } = this.state;

    const buttonGroups = buttons.map((buttonText, index) => {
      const defaultContainerStyle = index === selectedIndex ? styles.selectedButtonContainer : styles.buttonContainer;
      const defaultTextStyle = index === selectedIndex ? styles.selectedButtonText : styles.buttonText;
      const customContainerStyle = index === selectedIndex ? selectedButtonStyle : buttonStyle;
      const customTextStyle = index === selectedIndex ? selectedTextStyle : textStyle;
      return (
        <TouchableOpacity key={index} onPress={() => this.onSelectedChange(index)} style={[defaultContainerStyle, customContainerStyle]}>
          <Text style={[defaultTextStyle, customTextStyle]}>
            {buttonText}
          </Text>
        </TouchableOpacity>
      );
    })

    return buttonGroups;
  }

  render() {
    const { containerStyle } = this.props;

    return(
      <View style={[styles.container, containerStyle]}>
        {this.renderButtons()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: WIDTH - 40,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3d3d3d',
    borderRadius: 30,
    marginVertical: 10,
    padding: 4
  },
  buttonContainer: {
    flex: 1,
    alignSelf: 'stretch',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectedButtonContainer: {
    flex: 1,
    alignSelf: 'stretch',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  buttonText: {
    color: 'white',
    fontSize: Normalize(13)
  },
  selectedButtonText: {
    color: '#3d3d3d',
    fontSize: Normalize(15),
    fontWeight: 'bold'
  }
});
