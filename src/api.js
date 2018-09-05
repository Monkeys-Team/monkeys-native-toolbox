const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

class Api {

  constructor(baseUrl, debug = true, token = null){
    this.BASE_URL = baseUrl;
    this.DEBUG = debug;
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

  request(path, data, method = 'GET', extras = {}) {
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
              console.log(`[OK] ${path}: ${_response}`);
            }
            resolve(_response)
            break;
          case 401:
            if(this.DEBUG){
              console.log(`[UNAUTHORIZED REQUEST] ${path}: `, _response);
            }
            reject(_response);
            break;
          default:
            if(this.DEBUG){
              console.log(`[ERROR] ${path}: `, _response);
            }
            reject(_response);
            break;
        }
      });
    });
  }
}

export default Api;
