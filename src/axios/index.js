import Jsonp from 'jsonp'
export default class Axios {
  static jsonp(options) {
    new Promise((resolve, reject) => {
      Jsonp(options.url, {
        param: 'callback'
      }, function (err, response) {
        if (response.status !== 200) {
          resolve(response)
        } else {
          reject(response.message)
        }
      })
    })
  }

}