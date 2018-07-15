import env from '../config/env'

async function request (context, url = '', method = 'get', data = {}) {
  method = method.toUpperCase()
  url = env.baseUrl + url
  console.log(method, url)

  switch (method) {
    case 'GET':
      let header = { emulateJSON: true }
      return context.$http.get(url, header)
  }
}

export default request
