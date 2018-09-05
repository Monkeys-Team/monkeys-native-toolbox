import { 
  Platform,
  Dimensions,
  PixelRatio
} from 'react-native';

export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;
export const PIXEL_RATIO = PixelRatio.get();

const X_WIDTH = 375;
const X_HEIGHT = 812;
export const IS_IPHONEX = !IS_ANDROID && WIDTH === X_WIDTH && HEIGHT === X_HEIGHT;
export const IS_ANDROID = Platform.OS === 'android';


