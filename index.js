import { TextInput, TouchableOpacity } from 'react-native';

TextInput.defaultProps = {
  selectionColor: '#bdc3c7',
  placeholderTextColor: '#bdc3c7',
  autoCapitalize: 'none',
  underlineColorAndroid: 'transparent',
  autoCorrect: false,
  allowFontScaling: false,
}

TouchableOpacity.defaultProps = {
  activeOpacity: 0.9
}

import * as Helpers from './src/helpers';
import * as Components from './src/components';

export { 
  Helpers,
  Components
};