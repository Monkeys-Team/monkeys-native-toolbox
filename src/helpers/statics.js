import DeviceInfo from 'react-native-device-info';

import {
  Platform,
  Dimensions,
  PixelRatio
} from 'react-native';

const _WIDTH = Dimensions.get('screen').width;
const _HEIGHT = Dimensions.get('screen').height;
let TEMP_WIDTH, TEMP_HEIGHT;

if (DeviceInfo.isTablet()) {
  if (_WIDTH > _HEIGHT) {
    TEMP_WIDTH = _WIDTH;
    TEMP_HEIGHT = _HEIGHT;
  } else {
    TEMP_WIDTH = _HEIGHT;
    TEMP_HEIGHT = _WIDTH;
  }
} else {
  TEMP_WIDTH = _WIDTH;
  TEMP_HEIGHT = _HEIGHT;
}


export const WIDTH = TEMP_WIDTH
export const HEIGHT = TEMP_HEIGHT
export const PIXEL_RATIO = PixelRatio.get();

const X_WIDTH = 375;
const X_HEIGHT = 812;
const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;
const X12_WIDTH = 390;
const X12_HEIGHT = 844;
const X12MAX_WIDTH = 428;
const X12MAX_HEIGHT = 926;

const X13_WIDTH = 393;
const X13_HEIGHT = 852;
const X14MAX_WIDTH = 430;
const X14MAX_HEIGHT = 932;

const X_12WIDTHS = (WIDTH === X12_WIDTH || WIDTH === X12MAX_WIDTH);
const X_12HEIGHTS = (HEIGHT === X12_HEIGHT || HEIGHT === X12MAX_HEIGHT);

const X_14WIDTHS = (WIDTH === X14MAX_WIDTH || WIDTH === X13_WIDTH);
const X_14HEIGHTS = (HEIGHT === X14MAX_HEIGHT || HEIGHT === X13_HEIGHT);

const X_WIDTHS = (WIDTH === X_WIDTH || WIDTH === XSMAX_WIDTH || WIDTH === X12_WIDTH || WIDTH === X12MAX_WIDTH);
const X_HEIGHTS = (HEIGHT === X_HEIGHT || HEIGHT === XSMAX_HEIGHT || HEIGHT === X12_HEIGHT || HEIGHT === X12MAX_HEIGHT);
export const IS_IPHONE12 = !IS_ANDROID && X_12WIDTHS && X_12HEIGHTS;
export const IS_IPHONEX = !IS_ANDROID && ((X_WIDTHS && X_HEIGHTS) || (X_12WIDTHS && X_12HEIGHTS) || (X_14WIDTHS && X_14HEIGHTS));
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