import React, { Component } from 'react';
import { MTextInput } from './textInput';

export class EmailInput extends Component {
  render() {
    return(
      <MTextInput
        {...this.props}
        placeholder={'Email'}
        keyboardType={'email-address'}
      />
    )
  }
}
