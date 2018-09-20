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

export const ONE_SECOND = 1000;
export const ONE_MINUTE = 60 * ONE_SECOND;
export const ONE_HOUR = 60 * ONE_MINUTE;
export const ONE_DAY = 24 * ONE_HOUR;
export const ONE_WEEK = 7 * ONE_DAY;
export const ONE_MONTH = 30 * ONE_DAY;
export const ONE_YEAR = 365 * ONE_DAY;

export const ONE_METER = 1;
export const TEN_METER = 10 * ONE_METER;
export const HUNDRED_METER = 10 * TEN_METER;
export const ONE_KILOMETER = 10 * HUNDRED_METER;
export const TEN_KILOMETER = 10 * ONE_KILOMETER;