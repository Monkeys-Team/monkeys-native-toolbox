const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}
export class Api {

  constructor(baseUrl, debug = true, retryCount = 0, retryTimeout = 2000, token = null){
    this.BASE_URL = baseUrl;
    this.DEBUG = debug;
    this.RETRY_COUNT = retryCount;
    this.RETRY_TIMEOUT = retryTimeout;
    this.TOKEN = token;

    if(this.DEBUG){
      console.log(`[API INITIALIZED] ${this.BASE_URL}`);
    }
  }

  setToken(token){
    if(this.DEBUG){
      console.log(`[SET TOKEN] ${token}`);
    }
    this.TOKEN = token;
  }

  async request(path, data, method = 'GET', extras = {}) {
    let options = {
      method,
      headers: DEFAULT_HEADERS
    };

    if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
      options['body'] = JSON.stringify(data);
    }
    if (method === 'GET' && data) {
      const keys = Object.keys(data);

      keys.forEach((key, i) => {

        const key_value = data[key];

        if (i === 0) {
          path += '?' + key + '=' + key_value;
        } else {
          path += '&' + key + '=' + key_value;
        }
      });
    }

    const url = this.BASE_URL + path;

    if (this.TOKEN) {
      options.headers['Authorization'] = this.TOKEN;
    }

    if(extras && extras.headers){
      extras.headers.forEach((header, i) => {
        options.headers[header.key] = header.value;
      });
    }

    if(this.DEBUG){
      console.log('[REQUEST URL] => ', url);
      console.log('[REQUEST OPTIONS] => ', options);
    }
    
    return new Promise((resolve, reject) => {
      fetch(url, options).then(async response => {
        const _response = await response.json();
        switch (response.status) {
          case 200:
            if(this.DEBUG){
              console.log('[OK] for ' + path + ' => ', _response);
            }
            resolve(_response)
            break;
          case 401:
            if(this.DEBUG){
              console.log('[UNAUTHORIZED REQUEST] for ' + path + ' => ', _response);
            }
            reject(_response);
            break;
          default:
            if(this.DEBUG){
              console.log('[ERROR] for ' + path + ' => ', _response);
            }
            if(this.RETRY_COUNT > 0){
              setTimeout(async () => {
                console.log('[REQUEST RETRYING] for ', url);
                this.RETRY_COUNT--;
                await this.request(path, data, method, extras);
              }, this.RETRY_TIMEOUT);
            }else{
              reject(_response);
            }
            break;
        }
      });
    });
  }
}
