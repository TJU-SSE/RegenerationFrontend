import {baseUrl} from '../../config/index'
import $ from 'jquery'


export default async(type = 'GET', url = '', data = {}, method = 'normal') => {
  type = type.toUpperCase()
  url = baseUrl + url

  let queryStr = ''
  if (type === 'GET') {
    Object.keys(data).forEach(key => {
      queryStr += key + '=' + data[key] + '&'
    })
    if (queryStr !== '') {
      queryStr = queryStr.substr(0, queryStr.lastIndexOf('&'))
      url += '?' + queryStr
    }
  }

  return new Promise((resolve, reject) => {
    if (method === 'normal') {
      $.ajax({
        type: type,
        url: url,
        processData: false,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true,
        data: JSON.stringify(data),
        timeout: 10000
      }).done(res => {
        resolve(res)
      }).catch(err => {
        resolve(err)
      })
    } else if (method === 'upload') {
      let formData = new FormData()
      for (let k in data) {
        formData.append(k, data[k])
      }

      $.ajax({
        type: type,
        url: url,
        processData: false,
        contentType: false,
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true,
        data: formData,
        timeout: 10000
      }).done(res => {
        resolve(res)
      }).catch(err => {
        resolve(err)
      })
    }
  })
}
