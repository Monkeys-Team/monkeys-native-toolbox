import { ONE_HOUR, ONE_MINUTE, HUNDRED_METER } from '../helpers';

class Location {
  constructor(){
    this.LOCATION = navigator.geolocation;
    this.TIMEOUT = ONE_MINUTE;
    this.MAXIMUM_AGE = ONE_HOUR;
    this.HIGH_ACCURACY = false;
    this.DISTANCE_FILTER = HUNDRED_METER;
    this.POWER_SAVE = false;
    this.WATCH_IDS = [];
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

  setDistanceFilter = (distanceFilter) => {
    this.DISTANCE_FILTER = distanceFilter;
  }

  setPowerSave = (powerSave) => {
    this.POWER_SAVE = powerSave;
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

  handleWatch = (data, cb) => {
    cb(data);
  }

  watchPosition = async (options, cb) => {
    const _options = {
      timeout: this.TIMEOUT, 
      maximumAge: this.MAXIMUM_AGE, 
      enableHighAccuracy: this.HIGH_ACCURACY,
      distanceFilter: this.DISTANCE_FILTER,
      useSignificantChanges: this.POWER_SAVE,
    };
    Object.assign(_options, options);
    const watchId = this.LOCATION.watchPosition(
      (data) => this.handleWatch(data, cb), 
      (error) => this.handleError(error, cb), 
      _options
    );
    this.WATCH_IDS.push(watchId);
  }

  stopObservingPosition = () => {
    this.WATCH_IDS.forEach(id => this.LOCATION.clearWatch(id));
    this.LOCATION.stopObserving();
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
