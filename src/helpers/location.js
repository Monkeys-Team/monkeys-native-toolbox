import { ONE_HOUR, ONE_MINUTE } from '../helpers';

class Location {
  constructor(){
    this.LOCATION = navigator.geolocation;
    this.TIMEOUT = ONE_MINUTE;
    this.MAXIMUM_AGE = ONE_HOUR;
    this.HIGH_ACCURACY = false;
  }

  setTimeout = (timeout) => {
    this.TIMEOUT = timeout;
  }

  setMaximumAge = (maximumAge) => {
    this.MAXIMUM_AGE = maximumAge;
  }

  setHighAccuracy = (highAccuracy) => {
    this.HIGH_ACCURACY = highAccuracy;
  }

  askPermission = () => {
    this.LOCATION.requestAuthorization()
  }

  handleLocation = (data, resolve) => {
    resolve(data);
  }

  handleError = (error, reject) => {
    reject({error: error.message});
  }

  getCurrentPosition = async (options) => {
    const _options = {
      timeout: this.TIMEOUT, 
      maximumAge: this.MAXIMUM_AGE, 
      enableHighAccuracy: this.HIGH_ACCURACY
    };
    Object.assign(_options, options);
    return new Promise((resolve, reject) => {
      this.LOCATION.getCurrentPosition(
        (data) => this.handleLocation(data, resolve), 
        (error) => this.handleError(error, reject), 
        _options
      );
    });
  }
}

export const LocationManager = new Location();
