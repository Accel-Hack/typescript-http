import ResponseSet from './entity/ResponseSet'
import HttpStatus from './enum/HttpStatus'
import { ClientUtils } from '../utils/ClientUtils'

class HttpClient {
  private static defaultConfig = {
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  }

  static get<E>(url: string, decoder?: (_: any) => E, option: object = {}): Promise<ResponseSet<E> | any> {
    const getOption = { ...this.defaultConfig, ...option, method: 'GET' }
    return this.fetch<E>(url, getOption, decoder)
  }

  static post<E>(url: string, body: any, decoder?: (_: any) => E, option: object = {}): Promise<ResponseSet<E> | any> {
    const postOption = { ...this.defaultConfig, ...option, body: JSON.stringify(body), method: 'POST' }
    return this.fetch<E>(url, postOption, decoder)
  }

  private static fetch<E>(url: string, option: object, decoder?: (_: any) => E): Promise<ResponseSet<E> | any> {
    return new Promise((resolve, reject) => {
      fetch(url, option)
        .then((response) => {
          if (ClientUtils.is2xx(response.status)) {
            // status code of 2xx
            // map status code to entity
            resolve(ResponseSet.error<E>(response.status, response.statusText))
          } else {
            response
              .json()
              .then((json) => resolve(ResponseSet.decode<E>(json, decoder)))
              .catch((err) => reject(err))
          }
        })
        // It will only reject on network failure or if anything prevented the request from completing.
        // ref: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API#differences_from_jquery
        .catch((err) => resolve(ResponseSet.error<E>(HttpStatus.NO_CONNECTION, err.message)))
        // un expected error
        .catch((err) => reject(err))
    })
  }
}

export default HttpClient
