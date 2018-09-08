import React, { Component } from 'react';
import { MTextInput } from './textInput';

export class PasswordInput extends Component {
  render() {
    return(
      <MTextInput
        {...this.props}
        placeholder={'Password'}
        secureTextEntry
      />
    )
  }
}
