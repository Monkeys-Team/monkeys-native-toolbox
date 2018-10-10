const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

import { RNS3 } from 'react-native-aws3';

export class Api {

  constructor(){
    this.DEBUG = __DEV__;
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

  setRefreshToken(func){
    if(this.DEBUG){
      console.log(`[SET REFRESH TOKEN FUNCTION]`);
    }
    this.REFRESH_TOKEN = func;
  }

  setLoadingFunc(func){
    if(this.DEBUG){
      console.log(`[SET LOADING FUNCTION]`);
    }
    this.LOADING_FUNC = func;
  }

  setBucketOptionsForFileUpload(options) {
    if(this.DEBUG){
      console.log('[SET BUCKET OPTIONS FOR FILE UPLOAD] => ', options);
    }
    this.BUCKET_OPTIONS = options;
  }

  setBucketUrlPrefix(prefix){
    if(this.DEBUG){
      console.log(`[SET BUCKET URL PREFIX FOR FILE UPLOAD] ${prefix}`);
    }
    this.BUCKET_URL_PREFIX = prefix;
  }

  showLoading(bg, status){
    if(this.LOADING_FUNC && !bg){
      this.LOADING_FUNC(status);
    }
  }

  async upload(path, prefix, fileType = 'jpeg', method = 'POST', extras = {}) {
    const file = {
      uri: path,
      name: new Date().getTime().toString() + '.' + fileType,
      type: fileType
    }

    let options = {};
    if(prefix){
      options = { keyPrefix: prefix + '/' + new Date().getTime() };
    }

    Object.assign(options, this.BUCKET_OPTIONS);
    if(this.DEBUG){
      console.log('[FILE UPLOAD OPTIONS] => ', options);
    }
    
    return new Promise(async (resolve, reject) => {
      try {
        this.showLoading(extras.bg, true);
        const response = await RNS3.put(file, options);
        this.showLoading(extras.bg, false);

        if(response.status !== 201) {
          if(this.DEBUG){
            console.log('[FAILED TO UPLOAD FILE] => ', response);
          }
          reject(response);
        }else {
          if(this.DEBUG){
            console.log('[FILE UPLOAD SUCCESSFUL] => ', response);
          }
          resolve(this.BUCKET_URL_PREFIX + response.body.postResponse.key);
        }
      } catch (error) {
        if(this.DEBUG){
          console.log('[FAILED TO UPLOAD FILE] => ', error);
        }
        reject(error);
      }
    });
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
    
    return new Promise(async (resolve, reject) => {
      this.showLoading(extras.bg, true);
      fetch(url, options).then(async response => {
        const _response = await response.json();
        this.showLoading(extras.bg, false);
        
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
            try {
              if(this.DEBUG){
                console.log('[REFRESH TOKEN INITIALIZED]');
              }
              if(this.REFRESH_TOKEN){
                await this.REFRESH_TOKEN();
                try {
                  const refreshedResponse = await this.request(path, data, method, extras);
                  resolve(refreshedResponse)
                } catch (error) {
                  reject(error);
                }
              }else{
                if(this.DEBUG){
                  console.log('[PLEASE PROVIDE REFRESH TOKEN FUNCTION TO API MANAGER]');
                }
                reject(_response);
              }
            } catch (error) {
              if(this.DEBUG){
                console.log('[REFRESH TOKEN ERROR] => ', error);
              }
              reject({error, response: _response});
            }
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
