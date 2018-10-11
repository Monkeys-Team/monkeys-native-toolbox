import React, { Component } from 'react';
import { MTextInput } from './textInput';

export class PasswordInput extends Component {
  render() {
    const { placeholder } = this.props;
    return(
      <MTextInput
        {...this.props}
        placeholder={ placeholder || 'Password' }
        secureTextEntry
      />
    )
  }
}
