class Location {
  constructor(){
    this.location = navigator.geolocation;
  }

  askPermission = () => {
    this.location.requestAuthorization()
  }

  handleLocation = (data, resolve) => {
    resolve(data);
  }

  handleError = (error, reject) => {
    reject({error: error.message});
  }

  getCurrentPosition = async (options = {}) => {
    return new Promise((resolve, reject) => {
      this.location.getCurrentPosition(
        (data) => this.handleLocation(data, resolve), 
        (error) => this.handleError(error, reject), 
        options
      );
    });
  }
}

export const LocationManager = new Location();
