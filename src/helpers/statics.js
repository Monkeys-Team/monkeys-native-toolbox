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
const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;
const X12_WIDTH = 390;
const X12_HEIGHT = 844;
const X12MAX_WIDTH = 428;
const X12MAX_HEIGHT = 926;
const X_12WIDTHS = (WIDTH === X12_WIDTH || WIDTH === X12MAX_WIDTH);
const X_12HEIGHTS = (HEIGHT === X12_HEIGHT || HEIGHT === X12MAX_HEIGHT);
const X_WIDTHS = (WIDTH === X_WIDTH || WIDTH === XSMAX_WIDTH || WIDTH === X12_WIDTH || WIDTH === X12MAX_WIDTH);
const X_HEIGHTS = (HEIGHT === X_HEIGHT || HEIGHT === XSMAX_HEIGHT || HEIGHT === X12_HEIGHT || HEIGHT === X12MAX_HEIGHT);
export const IS_IPHONE12 = !IS_ANDROID && X_12WIDTHS && X_12HEIGHTS;
export const IS_IPHONEX = !IS_ANDROID && X_WIDTHS && X_HEIGHTS;
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