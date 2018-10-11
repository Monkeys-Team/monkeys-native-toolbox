import React, { Component } from 'react';
import { MTextInput } from './textInput';

export class EmailInput extends Component {
  render() {
    const { placeholder } = this.props;
    return(
      <MTextInput
        {...this.props}
        placeholder={ placeholder || 'Email' }
        keyboardType={'email-address'}
      />
    )
  }
}
