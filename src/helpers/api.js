const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}
export class Api {

  constructor(){
    this.DEBUG = true;
    this.RETRY_COUNT = 0;
    this.RETRY_TIMEOUT = 0; // in milliseconds

    if(this.DEBUG){
      console.log('[API MANAGER INITIALIZED]');
    }
  }

  setDebug(debug){
    if(this.DEBUG){
      console.log(`[SET DEBUG] ${debug}`);
    }
    this.DEBUG = debug;
  }

  setBaseUrl(baseUrl){
    if(this.DEBUG){
      console.log(`[SET BASE URL] ${baseUrl}`);
    }
    this.BASE_URL = baseUrl;
  }

  setRetryCount(retryCount){
    if(this.DEBUG){
      console.log(`[SET RETRY COUNT] ${retryCount}`);
    }
    this.RETRY_COUNT = retryCount;
  }

  setRetryTimeout(retryTimeout){
    if(this.DEBUG){
      console.log(`[SET RETRY TIMEOUT] ${retryTimeout}`);
    }
    this.RETRY_TIMEOUT = retryTimeout;
  }

  setToken(token) {
    if(this.DEBUG){
      console.log(`[SET TOKEN] ${token}`);
    }
    this.TOKEN = token;
  }

  async request(path, data, method = 'GET', extras = {retryCount: this.RETRY_COUNT, retryTimeout: this.RETRY_TIMEOUT}) {
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
            if(extras.retryCount > 0){
              setTimeout(async () => {
                if(this.DEBUG){
                  console.log('[REQUEST RETRYING] for ', url);
                }
                extras.retryCount--;
                await this.request(path, data, method, extras);
              }, extras.retryTimeout);
            }else{
              reject(_response);
            }
            break;
        }
      });
    });
  }
}

export const ApiManager = new Api();
