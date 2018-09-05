import { 
  TextInput, 
  TouchableOpacity, 
  Text, 
  Platform,
  Dimensions
} from 'react-native';

TouchableOpacity.defaultProps = {
  activeOpacity: 0.9
}

TextInput.defaultProps = {
  autoCapitalize: 'none',
  underlineColorAndroid: 'transparent',
  autoCorrect: false
}

Text.defaultProps = {
  allowFontScaling: false,
}

const X_WIDTH = 375;
const X_HEIGHT = 812;
export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;
export const IS_ANDROID = Platform.OS === 'android';
export const IS_IPHONEX = !IS_ANDROID && WIDTH === X_WIDTH && HEIGHT === X_HEIGHT;